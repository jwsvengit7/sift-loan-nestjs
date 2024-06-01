import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
import { User } from 'src/domain/entities/user.entity';
import { OTP } from 'src/domain/entities/otp.entity';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from '../auth.service';
import { UserRepository } from 'src/domain/repository/user.repository';
import { JWTStartegy } from 'src/security/jwt.service';
dotenv.config();
const secret=process.env.JWT_SECRET as string;
@Module({
  imports: [
    TypeOrmModule.forFeature([User,OTP]),
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: { 
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JWTStartegy
  ],
})

export class AuthModule  {

}