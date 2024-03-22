import { Injectable, NotFoundException } from '@nestjs/common';
import { EmpresasService } from 'src/empresas/empresas.service';

@Injectable()
export class CommonService {
  constructor(private readonly empresaService: EmpresasService) {}

  async getEmpresa(id_empresa: string) {
    const empresa = await this.empresaService.findOne(id_empresa);
    if (!empresa) throw new NotFoundException('Empresa relacionada no existe');
    return empresa;
  }
}
