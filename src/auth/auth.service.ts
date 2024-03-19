import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { handleDBExceptions } from 'src/common';
import { EmpresasService } from 'src/empresas/empresas.service';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, LoginUserDTO } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly Logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly empresaService: EmpresasService,
  ) {}

  async create(createUserDto: CreateUserDTO, u: User) {
    try {
      const { password, ...userData } = createUserDto;

      let { id_empresa } = u;

      id_empresa = id_empresa ? id_empresa : userData.empresa;

      const empresa = await this.empresaService.findOne(id_empresa);

      if (!empresa)
        throw new NotFoundException('Empresa relacionada no existe');

      const user = this.userRepository.create({
        ...userData,
        empresa,
        password: bcrypt.hashSync(password, 10),
      });

      console.warn({ user });

      await this.userRepository.save(user);

      delete user.password;
      user.empresa = this.purgueEmpresa(empresa);

      return user;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async login(loginUserDTO: LoginUserDTO) {
    try {
      const { email, password } = loginUserDTO;
      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true },
        relations: ['empresa'],
      });

      if (!user) throw new UnauthorizedException('Credenciales inválidas');

      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Credenciales inválidas');

      const empresa = user.empresa;

      const id_empresa = empresa.id;

      delete user.password;
      delete user.empresa;

      return {
        ...user,
        id_empresa: empresa.id,
        token: this.getJWTToken({ id: user.id, id_empresa }),
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
      //return error;
    }
  }

  async checkAuthStatus(user: User) {
    delete user.roles;
    const { empresa } = user;
    return {
      ...user,
      token: this.getJWTToken({
        id: user.id,
        id_empresa: empresa.id,
      }),
    };
  }

  private getJWTToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  getTokenInfo(token: string): JwtPayload {
    return this.jwtService.decode(token);
  }

  private purgueEmpresa(empresa: Empresa): Empresa {
    delete empresa.activo;
    delete empresa.usuarios;
    delete empresa.created_at;
    delete empresa.updated_at;
    return empresa;
  }
}
