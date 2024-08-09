

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity'; 
import { OrderItem } from './orderItem.entity';
import { Model } from './model.entity';
import { OrderStatus } from 'src/libs/decorators/OrderStatus.enum';

@Entity()
export class Order extends Model {
  @PrimaryGeneratedColumn({ name: 'id'})
  orderId: number;

  @Column( {name: 'status', default: OrderStatus.Pending})
  status: string;

  @Column({ name : 'total_price', default: 0})
  totalPrice: number;

  @Column({ name: 'description', nullable: true })
  desc?: string;

  @Column({ name: 'note', nullable: true })
  note?: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  orderItems: OrderItem[];
}
