import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { DoctorRole } from '../enum/doctor-role.enum';
import { Hospitall } from 'src/hospitall/entities/hospitall.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';

@Entity('doctor')
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'enum', enum: DoctorRole, default: DoctorRole.DOCTOR })
    role: DoctorRole;


    @Column({ type: 'int' })
    hospitalId: number;

    @ManyToOne(() => Hospitall, (hos) => hos.doctors, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'hospitalId' })
    hospital: Hospitall

    @ManyToOne(() => Appointment, (app) => app.doctor, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    appoitment: Appointment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
