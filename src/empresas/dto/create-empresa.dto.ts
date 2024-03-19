import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @ApiProperty({
    description: 'Número de iidentificación tributaria',
    example: '10122012334-5',
  })
  @IsString()
  @IsNotEmpty()
  nit: string;

  @ApiProperty({
    description: 'Nombre corredpondiente a la empresa',
    example: 'Banco de la república de Colombia',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Descripción correspondiente a la empresa',
    example: 'Banco encargado de la emisión de moneda en Colombia',
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
