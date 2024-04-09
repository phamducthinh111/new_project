import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Model } from "./model.entity";

@Entity('users')
export class Employee extends Model {
    @PrimaryGeneratedColumn({ name : 'id'})
    emlId: number;

    @Column({ name: 'username' })
    username: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'phone' })
    phone: string;

    @Column({ name: 'address' })
    address: string;

    @Column({ name: 'role' })
    role: string;
}