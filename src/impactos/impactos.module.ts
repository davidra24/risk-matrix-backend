import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/modules';
import { Impacto } from './entities/impacto.entity';
import { ImpactosController } from './impactos.controller';
import { ImpactosService } from './impactos.service';

@Module({
  controllers: [ImpactosController],
  providers: [ImpactosService],
  imports: [TypeOrmModule.forFeature([Impacto]), AuthModule],
})
export class ImpactosModule {}
