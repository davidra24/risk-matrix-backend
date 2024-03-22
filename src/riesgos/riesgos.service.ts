import { Injectable } from '@nestjs/common';
import { CreateRiesgoDto } from './dto/create-riesgo.dto';
import { UpdateRiesgoDto } from './dto/update-riesgo.dto';

@Injectable()
export class RiesgosService {
  create(createRiesgoDto: CreateRiesgoDto) {
    return 'This action adds a new riesgo';
  }

  findAll() {
    return `This action returns all riesgos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} riesgo`;
  }

  update(id: number, updateRiesgoDto: UpdateRiesgoDto) {
    return `This action updates a #${id} riesgo`;
  }

  remove(id: number) {
    return `This action removes a #${id} riesgo`;
  }
}
