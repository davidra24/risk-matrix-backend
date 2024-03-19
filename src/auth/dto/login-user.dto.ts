import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDTO {
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
}
