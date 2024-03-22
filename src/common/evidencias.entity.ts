import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Evidencias')
export class Evidencia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  nombre: string;

  @Column('text')
  adjuntos: string[];
}
