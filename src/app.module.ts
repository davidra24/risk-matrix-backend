import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasModule } from './areas/areas.module';
import { AuthModule } from './auth/modules/auth.module';
import { UserModule } from './auth/modules/user.module';
import { CommonModule } from './common/common.module';
import { EmpresasModule } from './empresas/empresas.module';
import { ImpactosModule } from './impactos/impactos.module';
import { FrecuenciasModule } from './probabilidades/probabilidades.module';
import { ProcesosModule } from './procesos/procesos.module';
import { RiesgosModule } from './riesgos/riesgos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmpresasModule,
    CommonModule,
    AreasModule,
    AuthModule,
    ProcesosModule,
    UserModule,
    ImpactosModule,
    FrecuenciasModule,
    RiesgosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
