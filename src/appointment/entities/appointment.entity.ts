import { Doctor } from "src/doctor/entities/doctor.entity";
import { Patient } from "src/patient/entities/patient.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('appointment')
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'date' })
    day: string

    @Column({ type: 'time' })
    time: string

    @Column({ type: 'int' })
    patientId: number

    @Column({ type: 'int' })
    doctorId: number

    @ManyToOne(() => Doctor, (doc) => doc.appoitment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'doctorId' })
    doctor: Doctor

    @ManyToOne(() => Patient, (pat) => pat.appoitment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'patientId' })
    patient: Patient

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

