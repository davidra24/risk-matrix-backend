import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from 'src/areas/entities/area.entity';
import { User } from 'src/auth/entities/user.entity';
import { UserService } from 'src/auth/services';
import { handleDBExceptions } from 'src/common';
import { Repository } from 'typeorm';
import { AreasService } from '../areas/areas.service';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';
import { Proceso } from './entities/proceso.entity';
import { QueryArea } from './interfaces/query-area.interface';

@Injectable()
export class ProcesosService {
  constructor(
    @InjectRepository(Proceso)
    private readonly procesoRepository: Repository<Proceso>,
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    private readonly areasService: AreasService,
    private readonly userService: UserService,
  ) {}

  Logger = new Logger('ProcesosService');

  async create(createProcesoDto: CreateProcesoDto) {
    try {
      const { id_area, id_proceso_padre, id_responsable } = createProcesoDto;

      const area = await this.areasService.findOne(id_area);

      const responsable = await this.userService.findUser(id_responsable);

      const padre = id_proceso_padre
        ? await this.findOne(id_proceso_padre)
        : null;

      const procesoCreado = await this.procesoRepository.create({
        ...createProcesoDto,
        area,
        responsable,
        padre,
      });

      const proceso = await this.procesoRepository.save(procesoCreado);

      return { ...proceso };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(user: User, queryArea?: QueryArea) {
    if (queryArea.areaId) {
      return this.findAllByArea(queryArea);
    }

    const id_empresa = user.id_empresa;
    let procesos: Array<Proceso> = [];
    const areas: Array<Area> = await this.areaRepository.find({
      where: { empresa: { id: id_empresa } },
    });

    if (!areas || areas.length <= 0)
      throw new NotFoundException(
        'No hay areas realacionadas a este proceso o esta empresa',
      );

    const areaPromises = areas.map(async (area) => {
      const { id } = area;
      const procesosPorArea = await this.findProcesosPorArea(id);
      procesos = [...procesos, ...procesosPorArea];
      return procesos;
    });

    await Promise.all(areaPromises);

    return procesos;
  }

  private async findAllByArea(queryArea: QueryArea) {
    const { areaId: id } = queryArea;
    return await this.findProcesosPorArea(id);
  }

  async findOne(id: string) {
    const proceso = await this.procesoRepository.findOne({
      where: { id },
      select: {
        responsable: { id: true, nombre: true, activo: true },
        padre: { id: true, nombre: true },
        area: { id: true, nombre: true },
      },
      relations: { area: true, padre: true, responsable: true },
    });

    if (!proceso || Object.keys(proceso).length === 0) {
      throw new NotFoundException('Recurso [Proceso] no encontrado');
    }

    if (!proceso.padre) delete proceso.padre;

    return proceso;
  }

  async update(id: string, updateProcesoDto: UpdateProcesoDto) {
    const proceso = await this.findOne(id);
    let { padre, responsable, area } = proceso;

    const { id: id_padre } = padre ? padre : { id: null };
    const { id: id_responsable } = responsable;
    const { id: id_area } = area;

    if (updateProcesoDto.id_proceso_padre === null) padre = null;
    else if (
      id_padre !== updateProcesoDto.id_proceso_padre &&
      id !== updateProcesoDto.id_proceso_padre
    ) {
      const auxPadre = padre;
      padre = await this.findOne(updateProcesoDto.id_proceso_padre);
      if (!padre) padre = auxPadre;
    }

    if (id_responsable !== updateProcesoDto.id_responsable)
      responsable = await this.userService.findUser(
        updateProcesoDto.id_responsable,
      );

    if (id_area !== updateProcesoDto.id_area)
      area = await this.areasService.findOne(updateProcesoDto.id_area);

    delete updateProcesoDto.id_area;
    delete updateProcesoDto.id_responsable;
    delete updateProcesoDto.id_proceso_padre;

    return this.procesoRepository.update(id, {
      ...proceso,
      ...updateProcesoDto,
      padre,
      responsable,
      area,
      id,
    });
  }

  async remove(id: string) {
    try {
      const proceso = await this.findOne(id);
      const result = await this.procesoRepository.remove(proceso);
      if (result) {
        return { recurso_eliminado: { ...result } };
      }
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  private async findProcesosPorArea(id: string) {
    try {
      return await this.procesoRepository.find({
        where: { area: { id } },
        relations: ['padre', 'area'],
        select: {
          padre: { id: true, nombre: true, nivel: true },
          area: { id: true, nombre: true },
        },
      });
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
