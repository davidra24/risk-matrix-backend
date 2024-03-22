import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateImpactoDto } from './dto/create-impacto.dto';
import { UpdateImpactoDto } from './dto/update-impacto.dto';
import { ImpactosService } from './impactos.service';

@Controller('impactos')
export class ImpactosController {
  constructor(private readonly impactosService: ImpactosService) {}

  @Post()
  create(@Body() createImpactoDto: CreateImpactoDto) {
    return this.impactosService.create(createImpactoDto);
  }

  @Get()
  findAll() {
    return this.impactosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.impactosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImpactoDto: UpdateImpactoDto) {
    return this.impactosService.update(id, updateImpactoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.impactosService.remove(id);
  }
}
