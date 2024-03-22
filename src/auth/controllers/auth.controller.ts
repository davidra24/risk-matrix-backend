import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from '../decorators';
import { CreateUserDTO, LoginUserDTO } from '../dto';
import { User } from '../entities/user.entity';
import { AuthService } from '../services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth()
  async register(@Body() createUserDTO: CreateUserDTO, @GetUser() user: User) {
    return await this.authService.create(createUserDTO, user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return await this.authService.login(loginUserDTO);
  }
}
