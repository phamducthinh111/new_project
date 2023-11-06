import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { OrderItem } from 'src/entity/orderItem.entity';
import { Product } from 'src/entity/products.entity';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { User } from 'src/entity/user.entity';
import { OrderService } from 'src/order/order.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem]),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Order]),
        TypeOrmModule.forFeature([Product]),
        AuthModule
        ],
    providers: [OrderItemService, OrderService],
    controllers: [OrderItemController]
})
export class OrderItemModule {}
