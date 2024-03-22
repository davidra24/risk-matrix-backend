import { ApiProperty } from '@nestjs/swagger';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { Proceso } from 'src/procesos/entities/proceso.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Usuarios' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  @Index({ unique: true })
  documento: string;

  @ApiProperty({
    example: 'Cédula de ciudadanía',
    description: 'Tipo de documento del usuario',
  })
  @Column('text')
  tipo_documento: string;

  @ApiProperty({
    example: 'hernesto.perez@gmail.com',
    description: 'Correo electrónico de usuario',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  nombre: string;

  @Column('bool', {
    default: true,
  })
  activo: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @ManyToOne(() => Empresa, (empresa: Empresa) => empresa.usuarios)
  empresa: Empresa;

  @OneToMany(() => Proceso, (proceso: Proceso) => proceso.responsable, {
    cascade: true,
  })
  procesos?: Proceso[];

  id_empresa?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeUpdate();
  }
}
