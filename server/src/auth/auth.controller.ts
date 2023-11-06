import { Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))

    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    @Get('profile')
    async getUser(
        @Headers('authorization') authorization: string) {
        const token = authorization.split(' ')[1];
        const user = await this.authService.getUserFromToken(token);
        return user;
    }
}
