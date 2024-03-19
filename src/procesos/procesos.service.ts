import { Injectable } from '@nestjs/common';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';

@Injectable()
export class ProcesosService {
  create(createProcesoDto: CreateProcesoDto) {
    return 'This action adds a new proceso';
  }

  findAll() {
    return `This action returns all procesos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proceso`;
  }

  update(id: number, updateProcesoDto: UpdateProcesoDto) {
    return `This action updates a #${id} proceso`;
  }

  remove(id: number) {
    return `This action removes a #${id} proceso`;
  }
}
