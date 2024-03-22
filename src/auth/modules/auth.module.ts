import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { AuthController } from '../controllers/auth.controller';
import { User } from '../entities/user.entity';
import { AuthService } from '../services';
import { JWTStrategy } from '../strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    CommonModule,
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
