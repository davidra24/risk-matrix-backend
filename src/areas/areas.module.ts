import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EmpresasModule } from 'src/empresas/empresas.module';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import { Area } from './entities/area.entity';

@Module({
  controllers: [AreasController],
  providers: [AreasService],
  imports: [TypeOrmModule.forFeature([Area]), EmpresasModule, AuthModule],
})
export class AreasModule {}
