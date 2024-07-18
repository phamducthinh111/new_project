import { Body, Controller, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { OrderItemService } from "./order-item.service";
import { CreateOrderItemDto } from "./dto/createOrderItem.dto";
import { Response } from "express";
import { ResponseObject } from "src/libs/response-object";
import { SERVER_ERROR_MESSAGE } from "src/libs/constants";

@Controller('order-items')
@UseGuards(AuthGuard('jwt'))
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) {}

    // @Post()
    // async createOrderItem(
    //     @Body() createOrderItemDto: CreateOrderItemDto,
    //     @Res() res: Response
    // ) {
    //     try {
    //         const result = await this.orderItemService.createOrderItem(createOrderItemDto);
    //         return res.send(ResponseObject.success(result));
    //     } catch (error) {
    //         console.log(error)
    //         return res
    //                 .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                 .send(ResponseObject.fail(SERVER_ERROR_MESSAGE))
    //     }
    // }
}