import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Empresas' })
export class Empresa {
  @ApiProperty({
    example: 'd7d418b7-3915-4b09-b211-627aad3ea5d7',
    description: 'Id de la empresa',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '10122012334-5',
    description: 'Nit de la empresa',
    uniqueItems: true,
  })
  @Column('text', {
    nullable: false,
  })
  @Index({ unique: true })
  nit: string;

  @ApiProperty({
    example: 'Banco de la república de Colombia',
    description: 'Nombre de la empresa',
  })
  @Column('text', {
    nullable: false,
  })
  nombre: string;

  @ApiProperty({
    example: 'Banco encargado de la emisión de moneda en Colombia',
    description: 'Descripción de la empresa',
  })
  @Column('text', {
    nullable: true,
  })
  descripcion: string;

  @Column('boolean', {
    nullable: true,
    default: true,
  })
  activo: boolean;
}
