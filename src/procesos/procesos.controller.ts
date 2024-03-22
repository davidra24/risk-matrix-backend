import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';
import { QueryArea } from './interfaces/query-area.interface';
import { ProcesosService } from './procesos.service';

@Controller('procesos')
export class ProcesosController {
  constructor(private readonly procesosService: ProcesosService) {}

  @Post()
  @Auth()
  create(@Body() createProcesoDto: CreateProcesoDto) {
    return this.procesosService.create(createProcesoDto);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User, @Query() queryArea?: QueryArea) {
    return this.procesosService.findAll(user, queryArea);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.procesosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProcesoDto: UpdateProcesoDto,
  ) {
    return this.procesosService.update(id, updateProcesoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.procesosService.remove(id);
  }
}
