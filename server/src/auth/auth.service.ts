// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async validateUserById(userId: number): Promise<any> {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async login(user: any) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserFromToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload; 
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
