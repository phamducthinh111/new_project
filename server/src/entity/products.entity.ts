import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./images.entity";
import { OrderItem } from "./orderItem.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn({ name : 'id'})
    productId: number;

    @Column({ name: 'name' })
    name: String;

    @Column({ name: 'description' })
    description: String;

    @Column({ name: 'price' })
    price: number;

    @Column({ name: 'quantity' })
    quantity: number;

    @OneToMany(() => Image, (image) => image.product, { cascade: true }) 
    imageUrl: Image[];

    @Column({ name: 'type_name' })
    typeName: String;

    @Column({ name: 'location' })
    location: String;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[];
}