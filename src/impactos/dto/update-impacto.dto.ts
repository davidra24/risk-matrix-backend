import { PartialType } from '@nestjs/swagger';
import { CreateImpactoDto } from './create-impacto.dto';

export class UpdateImpactoDto extends PartialType(CreateImpactoDto) {}
