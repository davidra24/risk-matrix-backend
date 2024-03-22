import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CommonService, PaginationDto, handleDBExceptions } from 'src/common';
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
    private readonly commonService: CommonService,
  ) {}

  async create(createAreaDto: CreateAreaDto, user: User) {
    try {
      const { id_empresa } = user;
      const empresa = await this.commonService.getEmpresa(id_empresa);

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
      relations: { procesos: true },
      select: { procesos: { id: true, nombre: true } },
    });

    return [...areas];
  }

  async findOne(id: string) {
    const area = await this.areaRepository.findOne({
      where: { id },
      relations: { empresa: false, procesos: true },
    });

    if (!area || Object.keys(area).length === 0) {
      throw new NotFoundException('Recurso [Area] no encontrado');
    }

    return { ...area };
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    const area = await this.findOne(id);
    delete area.id_empresa;
    return this.areaRepository.update(id, {
      ...area,
      ...updateAreaDto,
      id,
    });
  }

  async remove(id: string) {
    try {
      const area = await this.findOne(id);
      const result = await this.areaRepository.remove(area);
      if (result) {
        return { recurso_eliminado: { ...result } };
      }
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
