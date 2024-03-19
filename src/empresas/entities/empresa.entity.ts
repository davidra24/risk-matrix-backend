import { Area } from 'src/areas/entities/area.entity';
import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Empresas' })
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  @Index({ unique: true })
  nit: string;

  @Column('text', {
    nullable: false,
  })
  nombre: string;

  @Column('text', {
    nullable: true,
  })
  descripcion: string;

  @Column('boolean', {
    default: true,
  })
  activo: boolean;

  @OneToMany(() => User, (user: User) => user.empresa, {
    cascade: true,
    eager: true,
  })
  usuarios?: User[];

  @OneToMany(() => Area, (area: Area) => area.empresa, {
    cascade: true,
    eager: true,
  })
  areas?: Area[];

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
