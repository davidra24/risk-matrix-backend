import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  private readonly Logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  async findUser(term: string): Promise<User> {
    let user = null;
    if (isUUID(term)) user = await this.userRepository.findOneBy({ id: term });
    if (!user) user = await this.userRepository.findOneBy({ documento: term });

    if (!user)
      throw new NotFoundException(
        `Usuario con el término de busqueda ${term} no encontrado`,
      );

    return user;
  }
}
