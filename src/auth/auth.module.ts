import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasModule } from 'src/empresas/empresas.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    forwardRef(() => EmpresasModule),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        //secret: process.env.JWT_SECRET
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('EXPIRES_JWT'),
        },
      }),
    }),
  ],
  providers: [AuthService, JWTStrategy],
  exports: [TypeOrmModule, JWTStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
