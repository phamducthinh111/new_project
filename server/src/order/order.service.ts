import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { OrderItem } from 'src/entity/orderItem.entity';
import { UserService } from 'src/user/user.service';
import { CreateOrderItemDto } from 'src/order-item/dto/createOrderItem.dto';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/entity';
import { Role } from 'src/libs/decorators/role.enum';
import { RemoveOrderDto } from './dto/removeOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async createOrder(currentUserId: number, createOrderDto: CreateOrderDto) {
    const { orderItemsData } = createOrderDto;
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    const newOrder = new Order();
    newOrder.user = findUser;
    newOrder.totalPrice = 0;
    newOrder.createDate = new Date();
    newOrder.createUser = findUser.username;
    newOrder.updateDate = new Date();
    newOrder.updateUser = findUser.username;

    const orderItems: OrderItem[] = [];
    for (const itemData of orderItemsData) {
      const product = await this.productService.getProductById(
        itemData.productId,
      );
      if (!product) {
        throw new NotFoundException(
          `Product with id ${itemData.productId} not found`,
        );
      }

      if (product.quantity < itemData.quantity) {
        throw new BadRequestException('Not enough product in stock');
      }

      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.quantity = itemData.quantity;
      orderItem.price = product.price * itemData.quantity;
      newOrder.totalPrice += orderItem.price;
      product.quantity -= itemData.quantity;
      await this.productService.updateQuantityProduct(product);
      orderItems.push(orderItem);
    }
    newOrder.orderItems = orderItems;
    const createdOrder = await this.orderRepository.save(newOrder);
    return createdOrder;
  }

  async getAllOrders(
    currentUserId: number,
    status?: string,
    delFlag?: boolean,
    fromDate?: Date,
    toDate?: Date,
  ) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    if (delFlag && findUser.role !== Role.admin) {
      throw new NotFoundException(
        `Account doesn't have permission to view deleted users`,
      );
    }

    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product');
    // Thêm điều kiện delFlag
    if (delFlag !== undefined) {
      queryBuilder.andWhere('order.delFlag = :delFlag', { delFlag });
    }

    // Thêm điều kiện tìm kiếm theo status nếu có
    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    // Thêm điều kiện tìm kiếm theo khoảng ngày
    if (fromDate) {
      queryBuilder.andWhere('order.orderDate >= :fromDate', { fromDate });
    }
    if (toDate) {
      queryBuilder.andWhere('order.orderDate <= :toDate', { toDate });
    }

    const orders = await queryBuilder.getMany();
    return orders;
  }

  async getOrderById(orderId: number) {
    return await this.orderRepository.findOne({
      where: { orderId },
      relations: ['orderItems', 'orderItems.product'],
    });
  }

  async updateOrder(
    currentUserId: number,
    orderId: number,
    updateOrderDto: UpdateOrderDto,
  ) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    const order = await this.orderRepository.findOne({
      where: { orderId },
      // relations: ['orderItems'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    order.status = updateOrderDto.status;
    order.updateUser = findUser.username;
    order.updateDate = new Date();

    // Clear old order items
    // await this.orderItemRepository.remove(order.orderItems);

    // Update order items
    // const newOrderItems: OrderItem[] = [];
    // for (const item of orderItems) {
    //   const product = await this.productRepository.findOne(item.productId);
    //   if (!product) {
    //     throw new NotFoundException(`Product with id ${item.productId} not found`);
    //   }

    //   const orderItem = new OrderItem();
    //   orderItem.product = product;
    //   orderItem.quantity = item.quantity;
    //   orderItem.price = product.price * item.quantity;
    //   newOrderItems.push(orderItem);
    // }

    // order.orderItems = newOrderItems;
    // order.totalPrice = newOrderItems.reduce((sum, item) => sum + item.price, 0);

    await this.orderRepository.update(orderId, order);
    return order;
  }

  async removeOrder(
    currentUserId: number,
    orderId: number,
    removeOrderDto: RemoveOrderDto,
  ) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    const order = await this.orderRepository.findOne({
      where: { orderId },
      relations: ['orderItems', 'orderItems.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    // Cập nhật lại quantity cho các sản phẩm trong orderItems
    for (const orderItem of order.orderItems) {
      const product = await this.productService.getProductById(
        orderItem.product.productId,
      );
      if (product) {
        product.quantity += orderItem.quantity;
        await this.productRepository.save(product);
      }
    }

    order.desc = removeOrderDto.desc;
    order.delFlag = true;
    order.updateUser = findUser.username;
    order.updateDate = new Date();

    await this.orderRepository.save(order);
    return order;
  }

  async rollbackOrder(currentUserId: number, orderId: number) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    const order = await this.orderRepository.findOne({
      where: { orderId },
      relations: ['orderItems', 'orderItems.product']
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    if (findUser.role !== Role.admin) {
      throw new NotFoundException(
        `Account doesn't have permission to Rollback`,
      );
    }

    // Cập nhật lại quantity cho các sản phẩm trong orderItems
    for (const orderItem of order.orderItems) {
      const product = await this.productService.getProductById(
        orderItem.product.productId,
      );
      if (product) {
        product.quantity -= orderItem.quantity;
        await this.productRepository.save(product);
      }
    }

    order.desc = null;
    order.delFlag = false;
    order.updateUser = findUser.username;
    order.updateDate = new Date();

    await this.orderRepository.save(order);
    return order;
  }

  async deleteOrder(currentUserId: number, orderId: number) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    const order = await this.orderRepository.findOne({
      where: { orderId },
      relations: ['orderItems'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    if (findUser.role !== Role.admin) {
      throw new NotFoundException(`Account doesn't have permission to delete`);
    }

    // Xóa các mục hàng liên quan trước
    await this.orderItemRepository.remove(order.orderItems);

    // Xóa đơn hàng
    await this.orderRepository.remove(order);
    return order;
  }
}
