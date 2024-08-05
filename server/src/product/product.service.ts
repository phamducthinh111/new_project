import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'src/entity/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { Image } from 'src/entity/images.entity';
import { validate } from 'class-validator';
import { User } from 'src/entity';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/libs/decorators/role.enum';
import { CreateProductDto, UpdateProductDto } from './dto';
import { query } from 'express';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Image)
    private ImageRepository: Repository<Image>,
    // @InjectRepository(User)
    // private userRepository: Repository<User>
    private userService: UserService,
  ) {}
  async createProduct(currentUserId, createProductDto: CreateProductDto) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    if (findUser.role !== Role.admin && findUser.role !== Role.manager) {
      throw new NotFoundException(
        `Account doesn't have permission to create Product`,
      );
    }
    const newProduct = new Product();

    newProduct.name = createProductDto.name;
    newProduct.quantity = createProductDto.quantity;
    newProduct.description = createProductDto.desc;
    newProduct.price = createProductDto.price;
    newProduct.label = createProductDto.label;
    newProduct.typeName = createProductDto.type;
    newProduct.location = createProductDto.loc;
    newProduct.createDate = new Date();
    newProduct.createUser = findUser.username;
    newProduct.updateDate = new Date();
    newProduct.updateUser = findUser.username;

    this.productRepository.insert(newProduct);
    return newProduct;
  }

  async upLoadListImage(currentUserId, productId: number, file: string) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    const findProduct = await this.productRepository.findOne({
      where: { productId },
      relations: ['imageUrl'],
    });
    if (!findProduct) {
      throw new NotFoundException(`Product with id ${findProduct} not found`);
    }
    const image = new Image();
    image.imageUrl = file;
    image.imageType = 'gallery';
    findProduct.imageUrl.push(image);

    return await this.productRepository.save(findProduct);
  }

  async upLoadTopicImage(currentUserId, productId: number, file: string) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    const findProduct = await this.productRepository.findOne({
      where: { productId },
      relations: ['imageUrl'],
    });

    if (!findProduct) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    // Tìm ảnh thumbnail hiện có và xóa nó nếu tồn tại
    const existingThumbnail = findProduct.imageUrl.find(
      (image) => image.imageType === 'thumbnail',
    );
    if (existingThumbnail) {
      findProduct.imageUrl = findProduct.imageUrl.filter(
        (image) => image.imageType !== 'thumbnail',
      );
      await this.ImageRepository.remove(existingThumbnail);
    }

    const image = new Image();
    image.imageUrl = file;
    image.imageType = 'thumbnail';

    findProduct.imageUrl.push(image);

    return await this.productRepository.save(findProduct);
  }

  async getAllProductPageAdmin(
    currentUserId: number,
    name?: string,
    delFlag?: boolean,
  ) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    if (delFlag && findUser.role !== Role.admin) {
      throw new NotFoundException(
        `Account doesn't have permission to view deleted product`,
      );
    }

    // Tạo query builder
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.productId',
        'product.name',
        'product.typeName',
        'product.delFlag',
        'product.quantity',
        'product.createDate',
        'product.createUser',
        'product.updateDate',
        'product.updateUser',
        'product.price',
      ])
      .leftJoinAndSelect('product.imageUrl', 'imageUrl'); // Nếu cần lấy cả imageUrl

    // Thêm điều kiện delFlag nếu được cung cấp
    if (delFlag !== undefined) {
      queryBuilder.where('product.delFlag = :delFlag', { delFlag });
    }

    // Thêm điều kiện tìm kiếm nếu có query
    if (name) {
      queryBuilder.andWhere('LOWER(product.name) LIKE LOWER(:query)', {
        query: `%${name}%`,
      });
    }

    // Lấy kết quả
    const result = await queryBuilder.getMany();
    return result;
  }

  async getAllProductPageUser(
    name?: string,
    typeName?: string,
    minPrice?:number,
    maxPrice?: number,
    delFlag?: boolean,
  ) {
    // Tạo query builder
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.productId',
        'product.name',
        'product.typeName',
        'product.delFlag',
        'product.quantity',
        'product.createDate',
        'product.createUser',
        'product.updateDate',
        'product.updateUser',
        'product.price',
      ])
      .leftJoinAndSelect('product.imageUrl', 'imageUrl'); // Nếu cần lấy cả imageUrl

    // Thêm điều kiện delFlag nếu được cung cấp
    if (delFlag !== undefined) {
      queryBuilder.where('product.delFlag = :delFlag', { delFlag });
    }

    // Thêm điều kiện tìm kiếm nếu có query
    if (name) {
      queryBuilder.andWhere('LOWER(product.name) LIKE LOWER(:query)', {
        query: `%${name}%`,
      });
    }

    if (typeName) {
      queryBuilder.andWhere('product.typeName = :typeName', { typeName });
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      queryBuilder.andWhere('product.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
      });
    } else if (minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    } else if (maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    // Lấy kết quả
    const result = await queryBuilder.getMany();
    return result;
  }

  async getSearchSuggestions(name: string, delFlag?: boolean) {
    if (!query) {
      return [];
    }

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .select(['product.productId', 'product.name'])
      .where('LOWER(product.name) LIKE LOWER(:query)', { query: `%${name}%` });

    // Thêm điều kiện delFlag nếu được cung cấp
    if (delFlag !== undefined) {
      queryBuilder.andWhere('product.delFlag = :delFlag', { delFlag });
    }

    const result = await queryBuilder.take(10).getMany();
    return result;
  }

  async getProductById(productId: number) {
    return await this.productRepository.findOne({
      where: { productId },
      relations: ['imageUrl'],
    });
  }

  async findProductByIdForOrder(productId: number) {
    return await this.productRepository.findOne({
      select: {
        productId: true,
        name: true,
        price: true,
        imageUrl: true,
        typeName: true,
        label: true,
      },
      where: { productId },
      relations: ['imageUrl'],
    });
  }

  async updateProductById(
    currentUserId,
    productId: number,
    updateProductDto: UpdateProductDto,
  ) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }
    const findProduct = await this.productRepository.findOne({
      where: { productId },
    });
    if (!findProduct) {
      throw new NotFoundException(`User with id ${productId} not found`);
    }
    findProduct.name = updateProductDto.name ?? findProduct.name;
    findProduct.quantity = updateProductDto.quantity ?? findProduct.quantity;
    findProduct.description =
      updateProductDto.description ?? findProduct.description;
    findProduct.price = updateProductDto.price ?? findProduct.price;
    findProduct.typeName = updateProductDto.typeName ?? findProduct.typeName;
    findProduct.location = updateProductDto.location ?? findProduct.location;
    findProduct.label = updateProductDto.label ?? findProduct.label;
    findProduct.updateDate = new Date();
    findProduct.updateUser = findUser.username;

    await this.productRepository.update(productId, findProduct);
    return findProduct;
  }

  async deletedImages(productId: number, imageId: any) {
    const findProduct = await this.productRepository.findOne({
      where: { productId },
      relations: ['imageUrl'],
    });
    if (!findProduct) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    const findImage = await this.ImageRepository.findOne({
      where: { imageId },
    });
    if (!findImage) {
      throw new NotFoundException(`Image with id ${imageId} not found`);
    }
    if (!findProduct.imageUrl.some((img) => img.imageId == imageId)) {
      throw new NotFoundException(
        `Image with id ${imageId} does not belong to product with id ${productId}`,
      );
    }
    findProduct.imageUrl = findProduct.imageUrl.filter(
      (img) => img.imageId !== imageId,
    );
    await this.productRepository.save(findProduct);

    await this.ImageRepository.remove(findImage);
  }

  async removeProduct(currentUserId, productId: number) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }
    const findProduct = await this.productRepository.findOne({
      where: { productId },
    });

    if (!findProduct) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    findProduct.delFlag = true;
    findProduct.updateUser = findUser.username;
    findProduct.updateDate = new Date();
    await this.productRepository.update(productId, findProduct);
  }

  async rollBackProductByAdmin(currentUserId, productId: number) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }
    const findProduct = await this.productRepository.findOne({
      where: { productId },
    });

    if (!findProduct) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    if (findUser.role !== Role.admin) {
      throw new NotFoundException(
        `Account doesn't have permission to Rollback`,
      );
    }

    findProduct.delFlag = false;
    findProduct.updateUser = findUser.username;
    findProduct.updateDate = new Date();
    await this.productRepository.update(productId, findProduct);
  }

  async deleteProduct(currentUserId, productId: number) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }
    const findProduct = await this.productRepository.findOne({
      where: { productId },
      relations: ['imageUrl'],
    });

    if (!findProduct) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    if (findUser.role !== Role.admin) {
      throw new NotFoundException(`Account doesn't have permission to delete`);
    }

    if (findProduct.imageUrl && findProduct.imageUrl.length > 0) {
      const imageIds = findProduct.imageUrl.map((image) => image.imageId);
      await this.ImageRepository.delete(imageIds);
    }
    await this.productRepository.remove(findProduct);
  }

  //order
  async updateQuantityProduct(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }
}
