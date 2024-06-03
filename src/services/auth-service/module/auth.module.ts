import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
import { User } from '../../../domain/entities/user.entity';
import { OTP } from '../../../domain/entities/otp.entity';
import { AuthController } from '../../../controllers/auth.controller';
import { AuthService } from '../auth.service';
import { UserRepository } from '../../../domain/repository/user.repository';
import { JWTStartegy } from '../../../security/jwt.service';
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