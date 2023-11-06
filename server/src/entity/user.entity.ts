import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ name : 'id'})
    userId: number;

    @Column({ name: 'username' })
    username: String;

    @Column({ name: 'password' })
    password: String;

    @Column({ name: 'email' })
    email: String;

    @Column({ name: 'phone' })
    phone: String;

    @Column({ name: 'address' })
    address: String;

    @Column({ name: 'is_admin'})
    isAdmin: String;

    @OneToMany(type => Order, order => order.user) 
    orders: Order[];
}