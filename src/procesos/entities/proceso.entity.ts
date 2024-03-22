import { Area } from 'src/areas/entities/area.entity';
import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { nivelProceso, tipoProceso } from '../interfaces/proceso.enum';

@Entity({ name: 'Procesos' })
export class Proceso {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  nombre: string;

  @Column('text', {
    nullable: false,
  })
  objetivo: string;

  @Column('enum', {
    nullable: false,
    enum: tipoProceso,
  })
  tipo: tipoProceso;

  @Column('enum', {
    nullable: false,
    enum: nivelProceso,
  })
  nivel: nivelProceso;

  @ManyToOne(() => User, (user: User) => user.procesos)
  responsable: User;

  @ManyToOne(() => Area, (area: Area) => area.procesos)
  area: Area;

  @ManyToOne(() => Proceso, (proceso: Proceso) => proceso.subProcesos)
  padre?: Proceso;

  @OneToMany(() => Proceso, (proceso: Proceso) => proceso.padre, {
    cascade: true,
  })
  subProcesos?: Proceso[];

  id_area?: string;
  id_padre?: string;

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
}
