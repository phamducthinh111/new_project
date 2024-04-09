
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { TokenPayload } from '../dto/token-payload.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from 'src/libs/constants/auth.constant';

@Injectable()
export class JwtTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: TokenPayload) {
    const {username} = payload
    if(!username) {
      throw new UnauthorizedException();
    }
    return await this.authService.validateUser(username);
  }
}
