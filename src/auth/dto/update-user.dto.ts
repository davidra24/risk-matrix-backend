import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDTO) {
  @ApiProperty({
    description: 'Roles correspondientes al usuario',
    example: '["admin","user"]',
  })
  @IsArray()
  @IsOptional()
  roles: Array<string>;

  @ApiProperty({
    example: 'true',
    description: 'Usuario activo',
  })
  @IsBoolean()
  @IsOptional()
  activo: boolean;
}
