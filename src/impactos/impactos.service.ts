import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { handleDBExceptions } from 'src/common';
import { Repository } from 'typeorm';
import { CreateImpactoDto } from './dto/create-impacto.dto';
import { UpdateImpactoDto } from './dto/update-impacto.dto';
import { Impacto } from './entities/impacto.entity';

@Injectable()
export class ImpactosService {
  Logger = new Logger('Impactos');

  constructor(
    @InjectRepository(Impacto)
    private readonly impactoRepository: Repository<Impacto>,
  ) {}

  async create(createImpactoDto: CreateImpactoDto) {
    try {
      const impacto = this.impactoRepository.create({
        ...createImpactoDto,
      });
      return await this.impactoRepository.save(impacto);
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.impactoRepository.find({});
  }

  async findOne(id: string) {
    const impacto = await this.impactoRepository.findOneBy({ id });

    if (!impacto || Object.keys(impacto).length <= 0)
      throw new NotFoundException('Recurso [impacto] no encontrada');

    return impacto;
  }

  async update(id: string, updateImpactoDto: UpdateImpactoDto) {
    const impacto = await this.findOne(id);
    return this.impactoRepository.update(id, {
      ...impacto,
      ...updateImpactoDto,
      id,
    });
  }

  async remove(id: string) {
    try {
      const impacto = await this.findOne(id);
      const result = await this.impactoRepository.remove(impacto);
      if (result) {
        return { recurso_eliminado: { ...result } };
      }
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
