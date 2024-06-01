import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OTP } from "../entities/otp.entity";

@Injectable()
export class OTPRepository{
    constructor(@InjectRepository(OTP)
    private otpRepository:Repository<OTP>){

    }
    async createOTP(newOTP: OTP): Promise<OTP> {
        return this.otpRepository.save(newOTP);
      }
      async findOneByOTP(otp: string): Promise<OTP | undefined> {
        return this.otpRepository.findOne({ where: { otp: otp } });
      }
      
    
}