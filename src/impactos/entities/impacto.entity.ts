import { tipoAfectacion } from 'src/common/interfaces/riesgo.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Impactos')
export class Impacto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  nombre: string;

  @Column('text', {
    nullable: false,
  })
  afectacion: string;

  @Column('enum', {
    nullable: false,
    enum: tipoAfectacion,
  })
  tipo_afectacion: tipoAfectacion;

  @Column('numeric', {
    nullable: false,
  })
  probabilidad: number;
}
