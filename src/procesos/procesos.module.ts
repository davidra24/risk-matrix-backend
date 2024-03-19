import { Module } from '@nestjs/common';
import { ProcesosService } from './procesos.service';
import { ProcesosController } from './procesos.controller';

@Module({
  controllers: [ProcesosController],
  providers: [ProcesosService],
})
export class ProcesosModule {}
