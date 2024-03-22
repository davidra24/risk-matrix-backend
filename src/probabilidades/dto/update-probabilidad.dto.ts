import { PartialType } from '@nestjs/swagger';
import { CreateProbabilidadDto } from './create-probabilidad.dto';

export class UpdateProbabilidadDto extends PartialType(CreateProbabilidadDto) {}
