import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtTokenStrategy } from './stategy/jwt.straegy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: '865362',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [AuthService, JwtTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
