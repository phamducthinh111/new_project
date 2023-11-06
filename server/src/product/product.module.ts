import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/products.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Image } from 'src/entity/images.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product]),TypeOrmModule.forFeature([Image])],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}
