import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/libs/decorators/public.decorators';
import { ResponseObject } from 'src/libs/decorators/dto/response-object.dto';
import { RefreshAuthGuard } from './guard/refresh-auth.guard';
import { CurrentUser } from 'src/libs/decorators/current-user.decorator';
import { AuthResponse, LoginDto } from './dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<ResponseObject<AuthResponse>> {
    const loginResponse = await this.authService.loginEmployee(loginDto);
    const {  token } = loginResponse;
    return ResponseObject.success({
      token
    });
  }

  @Public()
  @Post('login-user')
  async loginUser(
    @Body() loginDto: LoginDto,
  ): Promise<ResponseObject<AuthResponse>> {
    const loginResponse = await this.authService.loginUser(loginDto);
    const {  token } = loginResponse;
    return ResponseObject.success({
      token
    });
  }

  @Get('profile')
  async getUser(
    @Res() res: Response,
    @CurrentUser('userId') currentUserId,
  ) {
    const user = await this.authService.getAuthUserInfo(currentUserId);
    return res.send(ResponseObject.success(user)) ;
  }

  @Public()
  @Get('logout')
  logout(@Res() res: Response, @Req() req: Request) {
    return res.status(200).send(ResponseObject.success('Logout successfully'));
  }


  // @Public()
  // @Post('token')
  // @UseGuards(RefreshAuthGuard)
  // async refreshToken(
  //   @CurrentUser('userId') userId,
  // ): Promise<ResponseObject<any>> {
  //   const authUser = await this.authService.getAuthUserInfo(userId);
  //   const token = this.authService.getAccessToken(userId);
  //   return ResponseObject.success({
  //     authUser,
  //     token,
  //   });
  // }
}
