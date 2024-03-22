import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { nivelProceso, tipoProceso } from '../interfaces/proceso.enum';

export class CreateProcesoDto {
  @ApiProperty({
    description: 'Nombre del proceso',
    example: 'Calidad',
  })
  @IsString()
  @MinLength(1)
  nombre: string;

  @ApiProperty({
    description: 'Objetivo del proceso',
    example: 'Medir los sistemas de control de calidad de la empresa pepito',
  })
  @IsString()
  @MinLength(1)
  objetivo: string;

  @ApiProperty({
    description: 'Tipo del proceso',
    example: tipoProceso.ESTRATEGICO,
  })
  @IsString()
  @MinLength(1)
  tipo: tipoProceso;

  @ApiProperty({
    description: 'Nivel del proceso',
    example: nivelProceso.MACROPROCESO,
  })
  @IsString()
  @MinLength(1)
  nivel: nivelProceso;

  @ApiProperty({
    description: 'Id o Documento de identidad del responsable del proceso',
    examples: ['1293849182', 'fa1b9d8f-5718-453c-8682-b8adc931d9e7'],
  })
  @IsString()
  @MinLength(1)
  id_responsable: string;

  @ApiProperty({
    description: 'Id del area al que corresponde este proceso',
    example: 'eca5de96-332c-475e-8708-414b767dd697',
  })
  @IsString()
  @MinLength(1)
  id_area: string;

  @ApiProperty({
    description: 'Id del proceso padre de este proceso',
    example: '93b05923-8f38-4b8a-84ff-eddfc401794c',
  })
  @IsString()
  @IsOptional()
  id_proceso_padre: string;
}
