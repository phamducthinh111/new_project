import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Image, Product } from 'src/entity';


@Module({
    imports: [TypeOrmModule.forFeature([Product]),TypeOrmModule.forFeature([Image])],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}
