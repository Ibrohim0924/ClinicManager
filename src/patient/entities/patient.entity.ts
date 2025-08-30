import { Appointment } from "src/appointment/entities/appointment.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'patient' })
export class Patient {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', unique: true })
    username: string

    @Column({ type: 'int' })
    age: number

    @Column({ type: 'varchar', unique: true })
    phone_number: string

    @OneToMany(() => Appointment, (app) => app.patient, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    appoitment: Appointment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}

