import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, UserModule } from 'src/auth/modules';
import { CommonModule } from 'src/common/common.module';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import { Area } from './entities/area.entity';

@Module({
  controllers: [AreasController],
  providers: [AreasService],
  imports: [
    TypeOrmModule.forFeature([Area]),
    CommonModule,
    UserModule,
    AuthModule,
  ],
  exports: [TypeOrmModule, AreasService],
})
export class AreasModule {}
