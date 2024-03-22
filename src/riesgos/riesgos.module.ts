import { Module } from '@nestjs/common';
import { RiesgosService } from './riesgos.service';
import { RiesgosController } from './riesgos.controller';

@Module({
  controllers: [RiesgosController],
  providers: [RiesgosService],
})
export class RiesgosModule {}
