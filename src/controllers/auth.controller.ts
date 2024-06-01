import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { LoginDto } from "src/domain/model/request/login.dto";
import { RegisterDto } from "src/domain/model/request/register.dto";
import { VerifyOTPDto } from "src/domain/model/request/verify.dto";
import { AuthService } from "src/services/auth-service/auth.service";

@Controller('api/auth')
export class AuthController {
    private authService: AuthService;
  
    constructor(authService: AuthService) {
      this.authService = authService;
    }

  @Post('register')
  @UsePipes(new ValidationPipe())
  createUser(@Body() registerDto: RegisterDto): object {
    return this.authService.createUser(registerDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  loginUser(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Post('verify-otp')
  @UsePipes(new ValidationPipe())
  verifyOTP(@Body() verifyOtp: VerifyOTPDto) {
    return this.authService.verify_otp(verifyOtp);
  }

  @Get('resend-otp/:email')
  @UsePipes(new ValidationPipe())
  resendOTP(@Param('email') email: string) {
    return this.authService.resendOTP(email);
  }
    
}