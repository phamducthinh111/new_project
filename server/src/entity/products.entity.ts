import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./images.entity";
import { OrderItem } from "./orderItem.entity";
import { Model } from "./model.entity";

@Entity('products')
export class Product extends Model {
    @PrimaryGeneratedColumn({ name : 'id'})
    productId: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'price' })
    price: number;

    @Column({ name: 'quantity' })
    quantity: number;

    @OneToMany(() => Image, (image) => image.product, { cascade: true })
    imageUrl: Image[];

    @Column({ name: 'type_name' })
    typeName: string;

    @Column({ name: 'location' })
    location: string;

    @Column({ name: 'label' })
    label: string;

    @Column({ name: 'rating', nullable: true })
    rating?: string;

    @Column({ name: 'discount', nullable: true })
    discount?: string;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[];
}