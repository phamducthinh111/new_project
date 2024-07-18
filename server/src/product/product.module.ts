import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Image, Product, User } from 'src/entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Image]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],

})
export class ProductModule {}
