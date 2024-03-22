import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RiesgosService } from './riesgos.service';
import { CreateRiesgoDto } from './dto/create-riesgo.dto';
import { UpdateRiesgoDto } from './dto/update-riesgo.dto';

@Controller('riesgos')
export class RiesgosController {
  constructor(private readonly riesgosService: RiesgosService) {}

  @Post()
  create(@Body() createRiesgoDto: CreateRiesgoDto) {
    return this.riesgosService.create(createRiesgoDto);
  }

  @Get()
  findAll() {
    return this.riesgosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riesgosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiesgoDto: UpdateRiesgoDto) {
    return this.riesgosService.update(+id, updateRiesgoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riesgosService.remove(+id);
  }
}
