import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import { Status, UserType } from "src/domain/enums/user.type";
import { LoginDto } from "src/domain/model/request/login.dto";
import { RegisterDto } from "src/domain/model/request/register.dto";
import { VerifyOTPDto } from "src/domain/model/request/verify.dto";
import { ApiResponseBuilder, ApiResponses } from "src/domain/model/response/api.response";
import { UserRepository } from "src/domain/repository/user.repository";
import * as bcrypt from 'bcrypt';
import { OTP } from "src/domain/entities/otp.entity";
import { OTPRepository } from "src/domain/repository/otp.repository";
@Injectable()
export class AuthService {

    private userRepository:UserRepository;
    private otpRepository:OTPRepository;

    constructor(userRepository:UserRepository){
        this.userRepository=userRepository;
    }


    async  verify_otp(verifyOtp: VerifyOTPDto):Promise<ApiResponses<string>>  {
        throw new Error("Method not implemented.");
    }
    async  resendOTP(email: string):Promise<ApiResponses<string>>  {
        throw new Error("Method not implemented.");
    }
    async  signIn(loginDto: LoginDto):Promise<ApiResponses<string>>  {
        throw new Error("Method not implemented.");
    }
   async createUser(registerDto: RegisterDto): Promise<ApiResponses<string>> {

       const user =  this.userRepository.findOneByEmail(registerDto.email);
       if(user){
        throw new ConflictException('Username or email already exists');
       }
       const hashedPassword = await bcrypt.hash(registerDto.password, 10);

       const newUser = new User();
       newUser.name = registerDto.fullName;
       newUser.phone = registerDto.phone;
       newUser.role = UserType.USER;
       newUser.email = registerDto.email;
       newUser.password = hashedPassword;
       newUser.status = Status.INACTIVE;

       try {
           const savedUser = await this.userRepository.saveUser(newUser);
           await this.sendVerificationOTP(savedUser);
           
           const userApiResponse = new ApiResponseBuilder<string>()
           .setMessage("User and OTP retrieved successfully")
           .setData(`${registerDto.fullName} has been successfully registered`)
           .build();
           return userApiResponse;
       } catch (error) {
           throw new Error('Error creating user: ' + error.message);
       }
        
    }

    private async sendVerificationOTP(user: User): Promise<void> {
        const otp = this.generateOTP(4);
        try {
            await this.saveOTPToDatabase(otp, user);
            const queue ="otp_message";
          //  await this.rabbitMQService.sendMessageOTP({ otp:otp, email:user.email},queue );
        } catch (error) {
            throw new Error('Error sending verification OTP: ' + error.message);
        }
    }

    private generateOTP(length: number): string {
        const chars = '0123456789'; 
        let otp = '';
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * chars.length); 
            otp += chars[index];
        }
        return otp;
    }
    

    private async saveOTPToDatabase(otp: string, user: User): Promise<void> {
        const saveOTP = new OTP();
        saveOTP.otp = otp;
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5);
        saveOTP.expiredAt = expirationTime;
        saveOTP.user = user;
        await this.otpRepository.createOTP(saveOTP);
        user.userOTP=saveOTP;
        await this.userRepository.saveUser(user)
      }

}