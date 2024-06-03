import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/createProduct.dto";
import { Product } from "src/entity/products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as path from 'path';
import * as fs from 'fs';
import { Image } from "src/entity/images.entity";
import { UpdateProductDto } from "./dto/updatePeoduct.dto";
import { validate } from "class-validator";
import { User } from "src/entity";
import { UserService } from "src/user/user.service";
import { Role } from "src/libs/decorators/role.enum";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Image)
        private ImageRepository: Repository<Image>,
        // @InjectRepository(User)
        // private userRepository: Repository<User>
        private usersService: UserService,
    ) {}
    async createProduct(currentUserId, createProductDto: CreateProductDto) {
        const findUser = await this.usersService.findOneById(currentUserId);
        if (!findUser) {
        throw new NotFoundException(`User with id ${currentUserId} not found`);
        }

        if (findUser.role !== Role.admin && findUser.role !== Role.manager) {
            throw new NotFoundException(`Account doesn't have permission to create Product`);
        }
        const newProduct = new Product();

        newProduct.name = createProductDto.name
        newProduct.quantity = createProductDto.quantity
        newProduct.description = createProductDto.desc
        newProduct.price = createProductDto.price
        newProduct.label = createProductDto.label
        newProduct.typeName = createProductDto.type
        newProduct.location = createProductDto.loc
        newProduct.createDate = new Date();
        newProduct.createUser = findUser.username;
        newProduct.updateDate = new Date();
        newProduct.updateUser = findUser.username;

        this.productRepository.insert(newProduct);
        return newProduct;
    }

    async upLoadListImage(currentUserId ,productId: number, file: string) {
        // const findUser = await this.usersService.findOneById(currentUserId);
        // if (!findUser) {
        //     throw new NotFoundException(`User with id ${currentUserId} not found`);
        //     }
    
        // if (findUser.role !== Role.admin && findUser.role !== Role.manager) {
        //         throw new NotFoundException(`Account doesn't have permission to create Product`);
        //     }
        const findProduct = await this.productRepository.findOne({where: {productId},relations:['imageUrl']},);
        if (!findProduct) {
            throw new NotFoundException(`Product with id ${findProduct} not found`);
          }
        const images = new Image();
        images.imageUrl = file;

        findProduct.imageUrl.push(images)

        return await this.productRepository.save(findProduct)
    }

    async getAllProduct() {
        return await this.productRepository.find({
            relations: ['imageUrl']
        });
    }

    async getProductById( productId: number) {
        return await this.productRepository.findOne({where: {productId}, relations: ['imageUrl']})
    }

    async updateProductById(productId: number, updateProductDto: UpdateProductDto) {
        const findProduct = await this.productRepository.findOne({where: {productId}});
        if (!findProduct) {
            throw new NotFoundException(`User with id ${productId} not found`);
        }
        findProduct.name = updateProductDto.name ?? findProduct.name
        findProduct.quantity = updateProductDto.quantity ?? findProduct.quantity
        findProduct.description = updateProductDto.desc ?? findProduct.description
        findProduct.price = updateProductDto.price ?? findProduct.price
        findProduct.typeName = updateProductDto.type ?? findProduct.typeName
        findProduct.location = updateProductDto.loc ?? findProduct.location

        return await this.productRepository.update(productId,findProduct)
    }

    async deletedImages(productId: number, imageId: any) {
        const findProduct = await this.productRepository.findOne({where: {productId},
            relations: ['imageUrl']
        });
        if (!findProduct) {
            throw new NotFoundException(`Product with id ${productId} not found`);
        }

        const findImage = await this.ImageRepository.findOne({where: {imageId}})
        if (!findImage) {
            throw new NotFoundException(`Image with id ${imageId} not found`);
        }
        if (!findProduct.imageUrl.some((img) => img.imageId == imageId)) {
            throw new NotFoundException(`Image with id ${imageId} does not belong to product with id ${productId}`);
        }  
        findProduct.imageUrl = findProduct.imageUrl.filter((img) => img.imageId !== imageId);
        await this.productRepository.save(findProduct);

        await this.ImageRepository.remove(findImage);
    }

    async deleteProduct( productId: number) {
        const findProduct = await this.productRepository.findOne({where: {productId},
            relations: ['imageUrl']
        });

        if (!findProduct) {
            throw new NotFoundException(`Product with id ${productId} not found`);
        }

        if (findProduct.imageUrl && findProduct.imageUrl.length > 0) {
            const imageIds = findProduct.imageUrl.map((image) => image.imageId);
            await this.ImageRepository.delete(imageIds)
        }
        await this.productRepository.remove(findProduct)
    }
}