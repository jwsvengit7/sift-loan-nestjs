import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { LoginDto } from "../domain/model/request/login.dto";
import { RegisterDto } from "../domain/model/request/register.dto";
import { VerifyOTPDto } from "../domain/model/request/verify.dto";
import { AuthService } from "../services/auth-service/auth.service";
import { ApiResponses } from "../domain/model/response/api.response";
import { Path } from "../helpers/path.helper";

@Controller(Path.BASEURL)
export class AuthController {
    private authService: AuthService;
  
    constructor(authService: AuthService) {
      this.authService = authService;
    }

  @Post(Path.REGISTER_URL)
  @UsePipes(new ValidationPipe())
  createUser(@Body() registerDto: RegisterDto): Promise<ApiResponses<string>> {
    return this.authService.createUser(registerDto);
  }

  @Post(Path.LOGIN_URL)
  @UsePipes(new ValidationPipe())
  loginUser(@Body() loginDto: LoginDto) :Promise<ApiResponses<string>>{
    return this.authService.signIn(loginDto);
  }

  @Post(Path.VERIFY_URL)
  @UsePipes(new ValidationPipe())
  verifyOTP(@Body() verifyOtp: VerifyOTPDto):Promise<ApiResponses<string>> {
    return this.authService.verify_otp(verifyOtp);
  }

  @Get(Path.RESEND_URL+'/:email')
  @UsePipes(new ValidationPipe())
  resendOTP(@Param('email') email: string):Promise<ApiResponses<string>> {
    return this.authService.resendOTP(email);
  }
    
}