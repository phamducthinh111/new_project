import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/entity/order.entity";
import { OrderItem } from "src/entity/orderItem.entity";
import { Product } from "src/entity/products.entity";
import { Repository } from "typeorm";
import { CreateOrderItemDto } from "./dto/createOrderItem.dto";
import { OrderService } from "src/order/order.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
        // @InjectRepository(Product)
        // private productRepository: Repository<Product>,
        // @InjectRepository(Order)
        // private orderRepository: Repository<Order>,
        // private orderService: OrderService,
        // private userService: UserService,
    ) {}

    // async createOrderItem(createOrderItemDto: CreateOrderItemDto){
    //     const { quantity, productId, orderId } = createOrderItemDto;

    //     const findProduct = await this.productRepository.findOne({where: {productId}})
    //     const findOrder = await this.orderRepository.findOne({where: {orderId}})

    //     if (!findProduct || !findOrder) {
    //         throw new NotFoundException('Product or order not found');
    //     }
    //     if(findProduct.quantity < quantity) {
    //         throw new BadRequestException('Not enough product in stock');
    //     }
    //     const newOrderItem = new OrderItem()
    //     newOrderItem.quantity = quantity
    //     newOrderItem.order = findOrder
    //     newOrderItem.product = findProduct
    //     newOrderItem.price = findProduct.price * quantity

    //     findProduct.quantity -= quantity;
    //     await this.productRepository.update(findProduct.productId, findProduct)
    //     const createdOrderItem = await this.orderItemRepository.save(newOrderItem);
    //     await this.orderService.calculateTotalPrice(orderId);
    //     return createdOrderItem;
    // }
}