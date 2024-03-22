import { Module } from '@nestjs/common';
import { EmpresasModule } from 'src/empresas/empresas.module';
import { CommonService } from './common.service';

@Module({
  imports: [EmpresasModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
