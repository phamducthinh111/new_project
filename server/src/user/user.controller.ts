import { Body, Controller, Get, Post, Put, Res, HttpStatus, UsePipes, ValidationPipe, Param, Delete, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { Response, Request } from 'express';
import { ResponseObject } from "src/libs/response-object";
import { SERVER_ERROR_MESSAGE } from "src/libs/constants";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
export class UserControler {
    constructor(private readonly userService: UserService) { }

    @Post()
    @UsePipes(ValidationPipe)

    async createUser(
        @Body() createUserDto: CreateUserDto,
        @Res() res: Response,
    ) {
        try {
            const isUsernameUnique = await this.userService.isUsernameUnique(createUserDto.username);
            const isEmailUnique = await this.userService.isEmailUnique(createUserDto.email);
            // const isPhoneUnique = await this.userService.isPhoneUnique(createUserDto.phone);

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

            // if (!isPhoneUnique) {
            //     return res
            //         .status(HttpStatus.BAD_REQUEST)
            //         .send(ResponseObject.fail('Phone number already exists'));
            // }

            const result = await this.userService.createUser(createUserDto);
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllUsers(
        @Res() res: Response
    ) {
        try {
            const result = await this.userService.getAllUsers()
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':userId')
    async getUserById(
        @Res() res: Response,
        @Param('userId') userId: any
    ) {
        try {
            const result = await this.userService.getUserById(userId);
            if (!result) {
                return res.status(HttpStatus.NOT_FOUND).send(ResponseObject.fail('User not found'));
            }
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':userId')
    async updateUserById(
        @Res() res: Response,
        @Param('userId') userId: any,
        @Body() updateUserDto: UpdateUserDto
    ) {
        try {
            const result = await this.userService.updateUserById(userId, updateUserDto);
            if (!result) {
                return res.status(HttpStatus.NOT_FOUND).send(ResponseObject.fail('User not found'));
            }
            return res.send(ResponseObject.success(result));
        } catch (error) {
            console.log(error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(ResponseObject.fail(SERVER_ERROR_MESSAGE));
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':userId')
    async deletedUser(
        @Res() res: Response,
        @Param('userId') userId: any
    ) {
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
};