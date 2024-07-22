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

      // Thay đổi giá sản phẩm trong đơn hàng
      orderItems.push(orderItem);

      // Cập nhật số lượng sản phẩm
      product.quantity -= itemData.quantity;
      await this.productService.updateQuantityProduct(product);
    }
    // Tính tổng giá trị đơn hàng sau khi đã thêm tất cả các sản phẩm
    newOrder.orderItems = orderItems;
    newOrder.totalPrice = orderItems.reduce(
      (total, item) => total + item.price,
      0,
    );
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
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product')
      .leftJoinAndSelect('product.imageUrl', 'imageUrl')
      .select([
        'order',
        'orderItems',
        'product.name',
        'user.userId',
        'user.username',
        'user.fullname',
        'imageUrl',
      ]);
    // Thêm điều kiện delFlag
    if (delFlag !== undefined) {
      queryBuilder.andWhere('order.delFlag = :delFlag', { delFlag });
    }

    // Thêm điều kiện tìm kiếm theo status nếu có
    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    // Thêm điều kiện tìm kiếm theo khoảng ngày
    if (fromDate && toDate) {
      queryBuilder.andWhere('order.createDate BETWEEN :fromDate AND :toDate', {
        fromDate,
        toDate,
      });
    } else if (fromDate) {
      queryBuilder.andWhere('order.createDate >= :fromDate', { fromDate });
    } else if (toDate) {
      queryBuilder.andWhere('order.createDate <= :toDate', { toDate });
    }

    const orders = await queryBuilder.getMany();
    return orders;
  }

  async getOrderById(orderId: number) {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .leftJoinAndSelect('product.imageUrl', 'imageUrl')
      .select([
        'order',
        'user.userId',
        'user.username',
        'user.email',
        'user.phone',
        'user.address',
        'user.role',
        'user.fullname',
        'user.sex',
        'user.birthday',
        'orderItem',
        'product',
        'imageUrl',
      ])
      .where('order.orderId = :orderId', { orderId });

    const order = await queryBuilder.getOne();
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    return order;
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
      relations: ['orderItems', 'orderItems.product'],
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

  async getSummary(currentUserId: number) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    const totalOrders = await this.orderRepository.count();
    const totalOrdersDeleted = await this.orderRepository.count({
      where: { delFlag: true },
    });
    const totalOrdersNotDeleted = await this.orderRepository.count({
      where: { delFlag: false },
    });
    const totalRevenue = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.totalPrice)', 'total')
      .where('order.delFlag = :delFlag', { delFlag: false })
      .getRawOne();

      const totalProductsSold = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .innerJoin('orderItem.order', 'order')
      .select('SUM(orderItem.quantity)', 'total')
      .where('order.delFlag = :delFlag', { delFlag: false })
      .getRawOne();

    return {
      totalOrders,
      totalOrdersDeleted,
      totalOrdersNotDeleted,
      totalRevenue: totalRevenue.total,
      totalProductsSold: totalProductsSold.total,
    };
  }

  async getRevenue(currentUserId: number) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    const revenueByDay = await this.orderRepository
      .createQueryBuilder('order')
      .select("TO_CHAR(order.createDate, 'YYYY-MM-DD')", 'date')
      .addSelect('COUNT(*)', 'count')
      .where('order.delFlag = :delFlag', { delFlag: false })
      .groupBy("TO_CHAR(order.createDate, 'YYYY-MM-DD')")
      .getRawMany();

    const revenueByMonth = await this.orderRepository
      .createQueryBuilder('order')
      .select("TO_CHAR(order.createDate, 'YYYY-MM')", 'month')
      .addSelect('COUNT(*)', 'count')
      .where('order.delFlag = :delFlag', { delFlag: false })
      .groupBy("TO_CHAR(order.createDate, 'YYYY-MM')")
      .getRawMany();

    const revenueByYear = await this.orderRepository
      .createQueryBuilder('order')
      .select("TO_CHAR(order.createDate, 'YYYY')", 'year')
      .addSelect('COUNT(*)', 'count')
      .where('order.delFlag = :delFlag', { delFlag: false })
      .groupBy("TO_CHAR(order.createDate, 'YYYY')")
      .getRawMany();

    return {
      revenueByDay,
      revenueByMonth,
      revenueByYear,
    };
  }

  async getOrderStatusSummary(currentUserId: number) {
    const findUser = await this.userService.findOneById(currentUserId);
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }

    const orderStatusSummary = await this.orderRepository
      .createQueryBuilder('order')
      .select('order.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('order.delFlag = :delFlag', { delFlag: false })
      .groupBy('order.status')
      .getRawMany();

    return orderStatusSummary;
  }
}
