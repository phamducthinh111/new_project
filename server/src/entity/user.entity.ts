import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Model } from "./model.entity";

@Entity('users')
export class User extends Model {
    @PrimaryGeneratedColumn({ name : 'id'})
    userId: number;

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

    @Column({ name: 'fullname', nullable: true })
    fullname?: string;

    @Column({ name: 'sex', nullable: true })
    sex?: string;

    @Column({ name: 'birthday', nullable: true })
    birthday?: Date;

    @OneToMany(type => Order, order => order.user) 
    orders: Order[];
}