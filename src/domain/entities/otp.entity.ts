import { Column, Entity,OneToOne,UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity({name:"otp_tb"})
export class OTP extends BaseEntity {
    @Column({name:"user_otp"})
    otp:string;

    @UpdateDateColumn({ name: 'expired_at' })
    expiredAt: Date;

    @OneToOne(() => User, user => user.userOTP,{onDelete:"CASCADE"})
    user: User; 

}
