import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Entity('hospital')
export class Hospitall {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  location: string;

  @OneToMany(() => Doctor, (doctor) => doctor.hospital, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  doctors: Doctor[];
  

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
