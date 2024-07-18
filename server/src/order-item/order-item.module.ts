import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { OrderService } from 'src/order/order.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { Order, OrderItem, Product, User } from 'src/entity';
import { ProductService } from 'src/product/product.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderItem]),
        // TypeOrmModule.forFeature([User]),
        // TypeOrmModule.forFeature([Order]),
        // TypeOrmModule.forFeature([Product]),
        // AuthModule,
        // UserModule,
        // ProductService
        ],
    providers: [OrderItemService],
    controllers: [OrderItemController],
    exports: [OrderItemService],
})
export class OrderItemModule {}
