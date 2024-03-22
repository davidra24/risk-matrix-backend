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
import { ValidRoles } from 'src/auth/interfaces';
import { PaginationDto } from 'src/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  @Auth(ValidRoles.empresa)
  create(@Body() createAreaDto: CreateAreaDto, @GetUser() user: User) {
    return this.areasService.create(createAreaDto, user);
  }

  @Get()
  @Auth(ValidRoles.empresa)
  findAll(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.areasService.findAll(paginationDto, user);
  }

  @Get(':id')
  @Auth(ValidRoles.empresa)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.areasService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.empresa)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areasService.update(id, updateAreaDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.empresa)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.areasService.remove(id);
  }
}
