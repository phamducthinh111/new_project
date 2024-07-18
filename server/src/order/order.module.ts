import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';
import { OrderItem } from 'src/entity/orderItem.entity';
import { Order, Product, User } from 'src/entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderItem]),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [OrderService,],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
