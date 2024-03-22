import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/modules';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';
import { Empresa } from './entities/empresa.entity';

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService],
  imports: [TypeOrmModule.forFeature([Empresa]), forwardRef(() => AuthModule)],
  exports: [TypeOrmModule, EmpresasService],
})
export class EmpresasModule {}
