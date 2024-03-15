import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @ApiProperty({
    description: 'Número de iidentificación tributaria',
  })
  @IsString()
  @IsNotEmpty()
  nit: string;

  @ApiProperty({
    description: 'Nombre corredpondiente a la empresa',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Descripción correspondiente a la empresa',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Informaciónn si la empresa está o no activa',
  })
  @IsBoolean()
  activo: boolean;
}
