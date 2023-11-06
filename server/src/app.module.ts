import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { MulterModule } from '@nestjs/platform-express';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'thinh251198',
      database: 'postgres',
      synchronize: true, 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migration/**/*.{ts,js}']
    }),
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    OrderItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
