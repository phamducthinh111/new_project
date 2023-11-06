

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity'; 
import { OrderItem } from './orderItem.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ name: 'id'})
  orderId: number;

  @Column( {name: 'status'})
  status: String;

  @Column({ name : 'order_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column({ name : 'total_price', default: 0})
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.userId)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
