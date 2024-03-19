import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty({
    description: 'Nombre del área de la empresa',
    example: 'Recursos humanos',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Descripción del área de la empresa',
    example:
      'Maneja el conjunto de aquellas personas que colaboran en una empresa en diferentes áreas y departamentos',
  })
  @IsString()
  descripcion: string;
}
