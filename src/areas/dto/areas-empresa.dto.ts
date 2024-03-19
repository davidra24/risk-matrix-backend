import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common';

export class AreasEmpresaDto extends PartialType(PaginationDto) {
  @ApiProperty({
    description: 'Empresa cuyas áreas se van a consultar',
    example: '123456789-0',
  })
  @IsOptional()
  @Type(() => Text)
  empresa?: string;
}
