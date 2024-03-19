import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import {
  PaginationDto,
  convertNIT,
  handleDBExceptions,
  isValidNIT,
} from 'src/common';
import { Repository } from 'typeorm';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './entities/empresa.entity';

@Injectable()
export class EmpresasService {
  private readonly Logger = new Logger('EmpresasService');

  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    try {
      const nit = convertNIT(createEmpresaDto.nit);
      const empresa = this.empresaRepository.create({
        ...createEmpresaDto,
        nit,
      });
      return await this.empresaRepository.save(empresa);
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const empresa = await this.empresaRepository.find({
      take: limit,
      skip: offset,
    });
    return empresa;
  }

  async findOne(term: string) {
    let empresa: Empresa;

    if (isUUID(term))
      empresa = await this.empresaRepository.findOneBy({ id: term });
    if (!empresa && isValidNIT(term))
      empresa = await this.empresaRepository.findOneBy({ nit: term });

    if (!empresa)
      throw new NotFoundException(
        `Empresa con el término de busqueda ${term} no encontrado`,
      );

    return empresa;
  }

  async update(id: string, updateEmpresaDto: UpdateEmpresaDto) {
    const empresa = await this.findOne(id);

    return this.empresaRepository.update(id, {
      ...empresa,
      ...updateEmpresaDto,
      id,
    });
  }

  async remove(id: string) {
    try {
      const empresa = await this.findOne(id);
      return await this.empresaRepository.remove(empresa);
    } catch (error) {
      return error;
    }
  }
}
