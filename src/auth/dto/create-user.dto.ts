import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Documento de identificación del usuario',
    example: '1098766587',
  })
  @IsString()
  @MinLength(1)
  documento: string;

  @ApiProperty({
    description: 'Tipo de documento del usuario',
    example: 'Cédula de ciudadanía',
  })
  @IsString()
  @MinLength(1)
  tipo_documento: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'joe.doe@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: '$2b$10$RnXpuawHIq1./qVRk9rXdO',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  /*@Matches(/(?: (?=.*|d) | (?=.*\W+)) (?! [.\n]) (?=,*[A-Z]) (?=**[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })*/
  password: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Smith',
  })
  @IsString()
  @MinLength(1)
  nombre: string;

  @ApiProperty({
    description: 'Identificador de empresa relacionada',
    example: '123456789-0',
  })
  @IsString()
  @MinLength(1)
  @IsOptional()
  empresa: string;
}
