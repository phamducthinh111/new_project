// auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from 'src/libs/constants/auth.constant';
import { AuthResponse, LoginDto, TokenPayload } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(username: string, password: string) {
  //   const user = await this.usersService.findOneByUsername(username);
  //   if (user && bcrypt.compareSync(password, user.password)) {
  //     return user;
  //   }
  //   return null;
  // }

  async validateUser(username: string): Promise<any> {
    try {
      if (!username) {
        return null;
      }
      const user = await this.usersService.findOneByUsername(username);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const { userId, createDate } = user;
      return { userId, username, createDate };
    } catch (err) {
      return null;
    }
  }

  async login(payload: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findOneByUsername(payload.username);
    if (!user) {
      throw new UnauthorizedException('Username is incorrect or inactive');
    }
    const passwordMatches = await bcrypt.compareSync(
      payload.password,
      user.password,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Password is incorrect or inactive');
    }

    if (user) {
      const accessToken = this.getAccessToken(
        user.username,
        user.role,
      );
      const refreshToken = this.getRefreshToken(
        user.username,
        user.role,
      );
      const { email, role, phone, address, username } = user;
      const token = {
        access_Token: accessToken,
        refresh_Token: refreshToken,
      };
      return {
        // authUser,
        token,
      };
    }
    return null;
  }

  async getAuthUserInfo(userId: number): Promise<any> {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new BadRequestException('Username is incorrect or inactive');
    }
    if (user) {
      const { email, role, phone, username, sex, fullname, birthday, address } = user;
      const authUser = {
        email,
        role,
        username,
        phone,
        sex,
        fullname,
        birthday,
        address
      }
      return authUser;
    }
    return null;
  }

  async getUserFromToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  getAccessToken(
    username: string,
    role: string,
  ) {
    const payload: TokenPayload = {
      username,
      role,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '30m',
    });
    return accessToken;
  }

  getRefreshToken(
    username: string,
    role: string,
  ) {
    const payload: TokenPayload = {
      username,
      role,
    };
    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '7d',
    });
    return refreshToken;
  }
}
