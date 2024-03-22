import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Probabilidades')
export class Probabilidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  @Index({ unique: true })
  nombre: string;

  @Column('text', {
    nullable: false,
  })
  frecuencia: string;

  @Column('numeric', {
    nullable: false,
  })
  probabilidad: number;
}
