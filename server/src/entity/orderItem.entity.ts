

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity'; 
import { Product } from './products.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn({ name : 'id'})
  id: number;

  @Column({ name: 'price'})
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, order => order.orderItems)
  order: Order;

  @ManyToOne(() => Product, product => product.orderItems)
  product: Product;
}
