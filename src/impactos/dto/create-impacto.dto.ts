import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';
import { tipoAfectacion } from 'src/common/interfaces/riesgo.interface';

export class CreateImpactoDto {
  @ApiProperty({
    description: 'Nombre del impacto',
    example: 'Muy Baja',
  })
  @IsString()
  @MinLength(1)
  nombre: string;

  @ApiProperty({
    description: 'Afectación correspondiente al impacto',
    example: 'Afectacion menor a 10SMLMV',
  })
  @IsString()
  @MinLength(1)
  afectacion: string;

  @ApiProperty({
    description: 'Tipo de afectación',
    example: 'economico',
  })
  @IsString()
  @MinLength(1)
  tipo_afectacion: tipoAfectacion;

  @ApiProperty({
    description: 'Probabilidad',
    example: 20,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  probabilidad: number;
}
