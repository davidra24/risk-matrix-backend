import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateProbabilidadDto {
  @ApiProperty({
    description: 'Nombre de la probabilidad',
    example: 'Muy Baja',
  })
  @IsString()
  @MinLength(1)
  nombre: string;

  @ApiProperty({
    description: 'Nombre de la probabilidad',
    example:
      'La actividad que conlleva el riesgo se ejecuta como máximo 2 veces al año',
  })
  @IsString()
  @MinLength(1)
  frecuencia: string;

  @ApiProperty({
    description: 'Probabilidad',
    example: 20,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  probabilidad: number;
}
