import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto, handleDBExceptions } from 'src/common';
import { EmpresasService } from 'src/empresas/empresas.service';
import { Repository } from 'typeorm';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './entities/area.entity';

@Injectable()
export class AreasService {
  private readonly Logger = new Logger('EmpresasService');

  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    private readonly empresaService: EmpresasService,
  ) {}

  async create(createAreaDto: CreateAreaDto, user: User) {
    try {
      const { id_empresa } = user;
      const empresa = await this.empresaService.findOne(id_empresa);
      const area = this.areaRepository.create({
        ...createAreaDto,
        empresa,
      });
      const result = await this.areaRepository.save(area);
      delete result.empresa;
      return { ...result, id_empresa };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto, user: User) {
    const id_empresa = user.id_empresa;

    const { limit = 10, offset = 0 } = paginationDto;
    const areas = await this.areaRepository.find({
      take: limit,
      skip: offset,
      where: { empresa: { id: id_empresa } },
    });

    if (!areas || areas.length <= 0)
      throw new NotFoundException('Area no encontrada');

    return areas.map((area) => ({ ...area, id_empresa }));
  }

  async findOne(id: string, user: User) {
    const id_empresa = user.id_empresa;

    const area = await this.areaRepository.findOneBy({ id });

    if (!area || Object.keys(area).length === 0) {
      throw new NotFoundException('Recurso no encontrado');
    }

    return { ...area, id_empresa };
  }

  async update(id: string, updateAreaDto: UpdateAreaDto, user: User) {
    const area = await this.findOne(id, user);
    delete area.id_empresa;
    return this.areaRepository.update(id, {
      ...area,
      ...updateAreaDto,
      id,
    });
  }

  async remove(id: string, user: User) {
    const area = await this.findOne(id, user);
    delete area.id_empresa;
    const result = await this.areaRepository.remove(area);
    if (result) {
      return { recurso_eliminado: { area } };
    }
  }
}
