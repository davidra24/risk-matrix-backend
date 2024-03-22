import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleDBExceptions } from 'src/common';
import { Repository } from 'typeorm';
import { CreateProbabilidadDto } from './dto/create-probabilidad.dto';
import { UpdateProbabilidadDto } from './dto/update-probabilidad.dto';
import { Probabilidad } from './entities/probabilidad.entity';

@Injectable()
export class ProabilidadesService {
  Logger = new Logger('Probabilidades');

  constructor(
    @InjectRepository(Probabilidad)
    private readonly probabilidadRepository: Repository<Probabilidad>,
  ) {}

  async create(createProbabilidadDto: CreateProbabilidadDto) {
    try {
      const probabilidad = this.probabilidadRepository.create({
        ...createProbabilidadDto,
      });
      return await this.probabilidadRepository.save(probabilidad);
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.probabilidadRepository.find({});
  }

  async findOne(id: string) {
    let probabilidad;

    probabilidad = await this.probabilidadRepository.findOneBy({ id });

    if (!probabilidad || Object.keys(probabilidad).length <= 0)
      throw new NotFoundException('Recurso [probabilidad] no encontrada');

    return probabilidad;
  }

  async update(id: string, updateProbabilidadDto: UpdateProbabilidadDto) {
    const probabilidad = await this.findOne(id);
    return this.probabilidadRepository.update(id, {
      ...probabilidad,
      ...updateProbabilidadDto,
      id,
    });
  }

  async remove(id: string) {
    try {
      const probabilidad = await this.findOne(id);
      const result = await this.probabilidadRepository.remove(probabilidad);
      if (result) {
        return { recurso_eliminado: { ...result } };
      }
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
