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
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { ResponseObject } from 'src/libs/response-object';
import { SERVER_ERROR_MESSAGE } from 'src/libs/constants';
import { CurrentUser } from 'src/libs/decorators/current-user.decorator';
import { Public } from 'src/libs/decorators/public.decorators';
import { User } from 'src/entity';
import { Roles } from 'src/libs/decorators/roles.decorator';
import { Role } from 'src/libs/decorators/role.enum';
import { RolesGuard } from 'src/libs/decorators/guard/roles.guard';
import { CreateUserDto, PasswordProfileDto, UpdateRoleDto, UpdateUserDto } from './dto';

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
          .send(ResponseObject.fail('Username already exists'));
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
    @Body() createEmloyess: CreateUserDto,
    @Res() res: Response,
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
          .send(ResponseObject.fail('Username already exists'));
      }

      if (!isEmailUnique) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(ResponseObject.fail('Email already exists'));
      }
      const result = await this.userService.createEmloyess(
        createEmloyess,
        currentUserId,
      );
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Get(':userId')
  async getUserById(@Res() res: Response, @Param('userId') userId: number) {
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
    @CurrentUser('userId') currentUserId,
  ) {
    try {
      const result = await this.userService.updateUserById(
        updateUserDto,
        currentUserId,
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

  @Put('update/password')
  async changePasswordProfile (
    @Res() res: Response,
    @Body() passwordProfile: PasswordProfileDto,
    @CurrentUser('userId') currentUserId,
  ) {
    try {
      const result = await this.userService.changePasswordById(
        passwordProfile,
        currentUserId,
      );
      return res.send(ResponseObject.success(result));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(ResponseObject.fail(error.response.message));
    }
  }

  @Public()
  @Get('search')
  async getSearchSuggestions(
    @Res() res: Response,
    @Query('username') username: string,
    @Query('delFlag') delFlag?: string,
  ) {
    console.log(username)
    // try {
    //   console.log(username)
    //   const delFlagValue = delFlag === 'true' ? true : false;
    //   const result = await this.userService.getSearchSuggestions(username, delFlagValue);
    //   return res.send(ResponseObject.success(result));
    // } catch (error) {
    //   console.log(error);
    //   return res
    //     .status(HttpStatus.BAD_REQUEST)
    //     .send(ResponseObject.fail(error.response.message));
    // }
  }

  @Get()
  async getAllUsers(
    @Res() res: Response,
    @CurrentUser('userId') currentUserId: number,
    @Query('delFlag') delFlag?: string,
    @Query('username') username?: string,
    @Query('role') role?: Role,

  ) {
    try{
      const delFlagValue = delFlag === 'true';
      const result = await this.userService.getAllUsers(currentUserId,username,role,delFlagValue);
      return  res.send(ResponseObject.success(result))
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(ResponseObject.fail(error.response.message));
    }
  }
  // manager ,admin
  @Delete('/remove/:userId')
  async removeUser(
    @Res() res: Response,
    @Param('userId') userId: number,
    @CurrentUser('userId') currentUserId,
  ) {
    try {
      const result = await this.userService.removeUser(userId, currentUserId);
      if (!result) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send(ResponseObject.fail('User not found'));
      }
      return res.send(ResponseObject.success('User remove successfully'));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  //admin
  @Delete('delete/:userId')
  async deleteUserByAdmin(
    @Res() res: Response,
    @Param('userId') userId: number,
    @CurrentUser('userId') currentUserId,
  ) {
    try {
      const result = await this.userService.deleteUserByAdmin(
        userId,
        currentUserId,
      );
      if (!result) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send(ResponseObject.fail('User not found'));
      }
      return res.send(ResponseObject.success('User deleted successfully'));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }

  @Put('rollback/:userId')
  async rollbackUserByAdmin(
    @Res() res: Response,
    @Param('userId') userId: number,
    @CurrentUser('userId') currentUserId,
  ) {
    try {
      const result = await this.userService.rollBackUserByAdmin(
        userId,
        currentUserId,
      );
      if (!result) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send(ResponseObject.fail('User not found'));
      }
      return res.send(ResponseObject.success('User rollback successfully'));
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }
  
  @Put('update/role/:userId')
  async updateRoleByAdmin(
    @Res() res: Response,
    @Param('userId') userId: number,
    @CurrentUser('userId') currentUserId,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    try{
      const result = await this.userService.updateRoleByAdmin(userId, currentUserId,updateRoleDto);
      if (!result) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send(ResponseObject.fail('User not found'));
      }
      return  res.send(ResponseObject.success(result))
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
    }
  }
}
