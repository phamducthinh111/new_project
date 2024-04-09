import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Res,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Response, Request } from 'express';
import { ResponseObject } from 'src/libs/response-object';
import { SERVER_ERROR_MESSAGE } from 'src/libs/constants';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/libs/decorators/current-user.decorator';
import { Public } from 'src/libs/decorators/public.decorators';
import { User } from 'src/entity';

@Controller('users')
export class UserControler {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const isUsernameUnique = await this.userService.isUsernameUnique(
        createUserDto.username,
      );
      const isEmailUnique = await this.userService.isEmailUnique(
        createUserDto.email,
      );

      if (!isUsernameUnique) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(ResponseObject.fail('Usename already exists'));
      }

      if (!isEmailUnique) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(ResponseObject.fail('Email already exists'));
      }

      const result = await this.userService.createUser(createUserDto);
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Post('/emloyess')
  @UsePipes(ValidationPipe)
  async createEmloyess(
    @CurrentUser('userId') currentUserId,
    @Body() createEmloyess : CreateUserDto,
    @Res() res: Response
  ) {
    try {
      const isUsernameUnique = await this.userService.isUsernameUnique(
        createEmloyess.username,
      );
      const isEmailUnique = await this.userService.isEmailUnique(
        createEmloyess.email,
      );
      if (!isUsernameUnique) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(ResponseObject.fail('Usename already exists'));
      }

      if (!isEmailUnique) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(ResponseObject.fail('Email already exists'));
      }
      const result = await this.userService.createEmloyess(createEmloyess,currentUserId);
      return res.send(ResponseObject.success(result));

    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }


  @Get()
  async getAllUsers(@Res() res: Response) {
    try {
      const result = await this.userService.getAllUsers();
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Get(':userId')
  async getUserById(@Res() res: Response, @Param('userId') userId: any) {
    try {
      const result = await this.userService.getUserById(userId);
      if (!result) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send(ResponseObject.fail('User not found'));
      }
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Put('/update')
  async updateUserById(
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser('userId') currentIdUser,
  ) {
    try {
      const result = await this.userService.updateUserById(
        updateUserDto,
        currentIdUser
      );
      if (!result) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send(ResponseObject.fail('User not found'));
      }
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Delete(':userId')
  async deletedUser(@Res() res: Response, @Param('userId') userId: any) {
    try {
      await this.userService.deleteUser(userId);
      return res.send(ResponseObject.success('User delted successfully'));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Get('/test')
  async testRouter (
    @CurrentUser('userId') userId,
  ) {
    console.log(userId)
    return userId
  }
}
