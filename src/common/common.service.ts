import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DUPLICATE_UNIQUE_CONSTRAINT } from './common.constants';

@Injectable()
export class CommonService {
  private readonly Logger = new Logger('CommonService');
  handleDBExceptions(error: any) {
    if (error.code === DUPLICATE_UNIQUE_CONSTRAINT)
      throw new BadRequestException(error.detail);
    this.Logger.error(error);
    throw new InternalServerErrorException('Error');
  }
  convertNIT(nit: string): string {
    //TODO: validar NIT con digito de verificacion
    return nit;
  }
  isValidNIT(nit: string): boolean {
    //TODO: Validar el formato dle nit y el digito de verificación
    return nit !== null;
  }
}
