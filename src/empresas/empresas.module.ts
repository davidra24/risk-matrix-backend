import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasModule } from 'src/areas/areas.module';
import { AuthModule } from 'src/auth/auth.module';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';
import { Empresa } from './entities/empresa.entity';

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService],
  imports: [
    TypeOrmModule.forFeature([Empresa]),
    forwardRef(() => AuthModule),
    forwardRef(() => AreasModule),
  ],
  exports: [EmpresasService],
})
export class EmpresasModule {}
