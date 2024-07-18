import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { ResponseObject } from 'src/libs/response-object';
import { SERVER_ERROR_MESSAGE } from 'src/libs/constants';
import { Request, Response } from 'express';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { CurrentUser } from 'src/libs/decorators/current-user.decorator';
import { RemoveOrderDto } from './dto/removeOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @CurrentUser('userId') currentUserId,
    @Body() createOrderDto: CreateOrderDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.orderService.createOrder(
        currentUserId,
        createOrderDto,
      );
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(ResponseObject.fail(error.response.message));
    }
  }

  @Get()
  async getAllOrder(
    @Res() res: Response,
    @CurrentUser('userId') currentUserId,
    @Query('status') status?: string,
    @Query('delFlag') delFlag?: string,
    @Query('fromDate') fromDate?: Date,
    @Query('toDate') toDate?: Date,
  ) {
    try {
      const delFlagValue = delFlag === 'true';
      const result = await this.orderService.getAllOrders(
        currentUserId,
        status,
        delFlagValue,
        fromDate,
        toDate,
      );
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(ResponseObject.fail(error.response.message));
    }
  }

  @Get(':orderId')
  async GetOrderById(@Res() res: Response, @Param('orderId') orderId: number) {
    try {
      const result = await this.orderService.getOrderById(orderId);
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(ResponseObject.fail(error.response.message));
    }
  }

  @Put(':orderId')
  async updateOrder(
    @CurrentUser('userId') currentUserId,
    @Body() updateOderDto: UpdateOrderDto,
    @Res() res: Response,
    @Param('orderId') orderId: number,
  ) {
    const result = await this.orderService.updateOrder(
      currentUserId,
      orderId,
      updateOderDto,
    );
    try {
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(ResponseObject.fail(error.response.message));
    }
  }

  @Put('remove/:orderId')
  async removeOrder(
    @CurrentUser('userId') currentUserId,
    @Body() removeOrderDto: RemoveOrderDto,
    @Res() res: Response,
    @Param('orderId') orderId: number,
  ) {
    const result = await this.orderService.removeOrder(
      currentUserId,
      orderId,
      removeOrderDto,
    );
    try {
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(ResponseObject.fail(error.response.message));
    }
  }

  @Put('rollback/:orderId')
  async rollbackOrder(
    @CurrentUser('userId') currentUserId,
    @Res() res: Response,
    @Param('orderId') orderId: number,
  ) {
    const result = await this.orderService.rollbackOrder(
      currentUserId,
      orderId,
    );
    try {
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(ResponseObject.fail(error.response.message));
    }
  }

  @Delete(':orderId')
  async deleteOrder(
    @CurrentUser('userId') currentUserId,
    @Res() res: Response,
    @Param('orderId') orderId: number,
  ) {
    try {
      const result = await this.orderService.deleteOrder(
        currentUserId,
        orderId,
      );
      return res.send(ResponseObject.success('Order deleted successfully'));
    } catch (error) {
      console.log(error);
      return res
      .status(HttpStatus.NOT_FOUND)
      .send(ResponseObject.fail(error.response.message));
    }
  }
}
