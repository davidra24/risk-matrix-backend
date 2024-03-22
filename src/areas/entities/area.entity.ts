import { Empresa } from 'src/empresas/entities/empresa.entity';
import { Proceso } from 'src/procesos/entities/proceso.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Areas' })
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  nombre: string;

  @Column('text', {
    nullable: false,
  })
  descripcion: string;

  @ManyToOne(() => Empresa, (empresa: Empresa) => empresa.areas, {
    nullable: false,
  })
  empresa: Empresa;

  @OneToMany(() => Proceso, (proceso: Proceso) => proceso.area, {
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
}
