import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';
import { Empresa } from './entities/empresa.entity';

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService],
  imports: [TypeOrmModule.forFeature([Empresa]), CommonModule],
})
export class EmpresasModule {}
