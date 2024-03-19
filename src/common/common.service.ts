import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  DUPLICATE_UNIQUE_CONSTRAINT,
  NOT_FOUND,
  UNDEFINED_SEARCH,
} from './common.constants';

const logger = new Logger('Common');

export const handleDBExceptions = (error: any) => {
  Logger.warn({ error });
  if (error.code === DUPLICATE_UNIQUE_CONSTRAINT)
    throw new BadRequestException(error.detail);
  if (error.code === UNDEFINED_SEARCH)
    throw new BadRequestException('Criterio de busqueda incorrecto');

  if (error.status === NOT_FOUND)
    throw new NotFoundException('Recursos no encontrados');

  throw new InternalServerErrorException(error);
};
export const convertNIT = (nit: string): string => {
  //TODO: validar NIT con digito de verificacion
  return nit;
};
export const isValidNIT = (nit: string): boolean => {
  //TODO: Validar el formato dle nit y el digito de verificación
  return nit !== null;
};
