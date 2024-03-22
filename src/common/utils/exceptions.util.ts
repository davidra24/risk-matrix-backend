import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  CONSTRAINT_VIOLATION,
  DUPLICATE_UNIQUE_CONSTRAINT,
  NOT_FOUND,
  UNDEFINED_SEARCH,
} from '../common.constants';

const logger = new Logger('handleExceptions');

export const handleDBExceptions = (error: any) => {
  Logger.warn({ error });
  if (error.code === DUPLICATE_UNIQUE_CONSTRAINT)
    throw new BadRequestException(
      'Creación de documento o identificación ya existente',
    );
  if (error.code === UNDEFINED_SEARCH)
    throw new BadRequestException('Criterio de busqueda incorrecto');
  if (error.code === CONSTRAINT_VIOLATION)
    throw new BadRequestException(
      'Error, hay recursos que dependen de esta acción',
    );
  if (error.status === NOT_FOUND)
    throw new NotFoundException('Recursos no encontrados');

  throw new InternalServerErrorException(error);
};
