import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { ResponseObject } from "src/libs/response-object";
import { SERVER_ERROR_MESSAGE } from "src/libs/constants";
import { Request, Response } from "express";
import { UpdateOrderDto } from "./dto/updateOrder.dto";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async createOrder(
        @Req() request: Request,
        @Headers('authorization') authorization: string,
        @Res() res: Response,
    ) {
        const token = authorization.split(' ')[1];
        const user = await this.orderService.getUserFromToken(token)
        // if (!user) {
        //     console.log(user.user.userId);
        // }
        try {
            const result = await this.orderService.createOrder(token);
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error)
            return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send(ResponseObject.fail(SERVER_ERROR_MESSAGE))
        }
    }

    @Get()
    async getAllOrder(@Res() res: Response) {
        try {
            const result = await this.orderService.getAllOrder()
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
        }
    }

    @Get(':id')
    async GetOrderById(
        @Res() res: Response,
        @Param('productId') id: number ) {
        try {
            const result = await this.orderService.getOrderById(id)
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
        }
    }

    @Put(':id')
    async updateOrder(
        @Body() updateOderDto: UpdateOrderDto,
        @Headers('authorization') authorization: string,
        @Res() res: Response,
        @Param('id') id: number,
    ) {
        const token = authorization.split(' ')[1];
        const user = await this.orderService.getUserFromToken(token)
        // if (!user) {
        //     console.log(user.user.userId);
        // }
        try {
            const result = await this.orderService.updateOrder(token,updateOderDto,id);
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error)
            return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send(ResponseObject.fail(SERVER_ERROR_MESSAGE))
        }
    }

    @Delete(':id')
    async deleteOrder(
        @Body() updateOderDto: UpdateOrderDto,
        @Headers('authorization') authorization: string,
        @Res() res: Response,
        @Param('id') id: number,
    ) {
        const token = authorization.split(' ')[1];
        const user = await this.orderService.getUserFromToken(token)

        try {
            const result = await this.orderService.deleteOrder(token,id);
            return res.send(ResponseObject.success('Order deleted successfully'));
        } catch (error) {
            console.log(error)
            return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send(ResponseObject.fail(SERVER_ERROR_MESSAGE))
        }
    }
}