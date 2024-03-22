import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/modules';
import { Probabilidad } from './entities/probabilidad.entity';
import { probabilidadesController } from './probabilidades.controller';
import { ProabilidadesService } from './probabilidades.service';

@Module({
  controllers: [probabilidadesController],
  providers: [ProabilidadesService],
  imports: [TypeOrmModule.forFeature([Probabilidad]), AuthModule],
})
export class FrecuenciasModule {}
