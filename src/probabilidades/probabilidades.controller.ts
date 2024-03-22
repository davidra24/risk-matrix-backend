import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProbabilidadDto } from './dto/create-probabilidad.dto';
import { UpdateProbabilidadDto } from './dto/update-probabilidad.dto';
import { ProabilidadesService } from './probabilidades.service';

@Controller('probabilidades')
export class probabilidadesController {
  constructor(private readonly probabilidadService: ProabilidadesService) {}

  @Post()
  create(@Body() createProbabilidadDto: CreateProbabilidadDto) {
    return this.probabilidadService.create(createProbabilidadDto);
  }

  @Get()
  findAll() {
    return this.probabilidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.probabilidadService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProbabilidadDto: UpdateProbabilidadDto,
  ) {
    return this.probabilidadService.update(id, updateProbabilidadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.probabilidadService.remove(id);
  }
}
