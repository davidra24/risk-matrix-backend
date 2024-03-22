import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers';
import { User } from '../entities/user.entity';
import { UserService } from '../services';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
