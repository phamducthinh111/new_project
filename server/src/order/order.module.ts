import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { User } from 'src/entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { OrderItem } from 'src/entity/orderItem.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order]),
            TypeOrmModule.forFeature([User]),
            AuthModule,
            TypeOrmModule.forFeature([OrderItem])],
    providers: [OrderService],
    controllers: [OrderController],
    exports: [OrderService]
})
export class OrderModule {}
