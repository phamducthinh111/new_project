import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/entity/order.entity";
import { Repository } from "typeorm";
import { User } from "src/entity/user.entity";
import { AuthService } from "src/auth/auth.service";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";
import { OrderItem } from "src/entity/orderItem.entity";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private OrderRepository: Repository<Order>,
        @InjectRepository(User)
        private OrderItemRepository: Repository<OrderItem>,
        private authService: AuthService
    ) {}

    async getUserFromToken(token: string) {
        try {
          const user = await this.authService.getUserFromToken(token);
          return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    async createOrder(token:string) {
        const user = await this.getUserFromToken(token);
        if (!user) {
            throw new NotFoundException(`user does not exist`);
          }
        
        const newOrder = new Order()
        newOrder.status = "open"
        newOrder.user = user.user.userId
        newOrder.totalPrice = parseInt('0',10)
        const createdOrder = await this.OrderRepository.save(newOrder);
        return createdOrder;
    }

    async calculateTotalPrice(orderId: number) {
        const order = await this.OrderRepository.findOne({ where: { orderId: orderId }, relations: ['orderItems'] });
        const orderItem = order.orderItems
        
        if(!orderItem || orderItem.length == 0) {
            order.totalPrice = 0
        }
        const total = orderItem.reduce((acc, item) => {
            // console.log(acc.price);
            // console.log(typeof acc.price);
            return acc + item.price;
          },0);
        order.totalPrice = total;
        console.log("thanhcong",total)
        await this.OrderRepository.save(order);

        return order
    }

    async getAllOrder() {
        return await this.OrderRepository.find({
            relations: ['orderItems']
        })
    }

    async getOrderById(orderId: number) {
        return await this.OrderRepository.findOne({
            where: {orderId},
            relations: ['orderItems']
        })
    }

    async updateOrder (
        token: string,
        updateOrderDto: UpdateOrderDto,
        orderId: number
    ) {
        const user = await this.getUserFromToken(token);
        if (!user) {
            throw new NotFoundException(`user does not exist`);
        }
        const findOder = await this.OrderRepository.findOne({where: {orderId}, relations: ['user'] })
        if (!findOder) {
            throw new NotFoundException(`Order with id ${orderId} not found`);
        }
        if (findOder.user.userId !== user.user.userId && user.user.isAdmin !== 'Y') {
            throw new UnauthorizedException(`You do not have permission to update this order`);
          }
        
        findOder.totalPrice = updateOrderDto.total;
        findOder.status = updateOrderDto.status;

        return await this.OrderRepository.save(findOder)
    }

    async deleteOrder (
        token: string,
        orderId: number
    ) {
        const user = await this.getUserFromToken(token);
        if (!user) {
            throw new NotFoundException(`user does not exist`);
        }
        const findOder = await this.OrderRepository.findOne({where: {orderId}, relations: ['user'] })
        if (!findOder) {
            throw new NotFoundException(`Order with id ${orderId} not found`);
        }
        // if( findOder.orderItems && findOder.orderItems.length > 0) {
        //     const orderItemIds = findOder.orderItems.map((item) => item.id);
            
        // } 
        if (findOder.user.userId !== user.user.userId && user.user.isAdmin !== 'Y') {
            throw new UnauthorizedException(`You do not have permission to deleted this order`);
        }
        await this.OrderRepository.remove(findOder)
    }
}