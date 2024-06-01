import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "../domain/entities/account.entity";
import { Loan } from "../domain/entities/loan.entity";
import { OTP } from "../domain/entities/otp.entity";
import { User } from "../domain/entities/user.entity";
import { Wallet } from "../domain/entities/wallet.entity";

export const ormconfig:TypeOrmModule = {
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"",
    database:"sift_loan",
    entities: [
        User,
        Loan,
        OTP,
        Account,
        Wallet,

    ],

    synchronize: true,
    dropSchema: false, 

}