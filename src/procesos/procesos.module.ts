import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasModule } from 'src/areas/areas.module';
import { AuthModule, UserModule } from 'src/auth/modules';
import { Proceso } from './entities/proceso.entity';
import { ProcesosController } from './procesos.controller';
import { ProcesosService } from './procesos.service';

@Module({
  controllers: [ProcesosController],
  providers: [ProcesosService],
  imports: [
    TypeOrmModule.forFeature([Proceso]),
    AreasModule,
    AuthModule,
    UserModule,
  ],
  exports: [ProcesosService],
})
export class ProcesosModule {}
