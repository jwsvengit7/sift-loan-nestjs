import { Status } from "../enums/user.type";
import { Entity, Column,JoinColumn,OneToOne } from 'typeorm';
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity({ name:"wallets"})
export class Wallet extends BaseEntity {

    @Column({ name: "wallet_balance" })
    private _walletBalance:number;

    @Column({
    name:"wallet_status",
    type:"enum",
    default:Status.PENDING,
    enum:Status
})
    private _walletStatus:Status;

    @OneToOne(() => User, user => user.wallet, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    get walletStatus(): Status {
        return this._walletStatus;
    }

      set setWalletStatus(walletStatus: Status) {
        this._walletStatus = walletStatus;
      }
      get walletBalance(): number {
        return this._walletBalance;
    }

      set setWalletBalance(walletBalance: number) {
        this._walletBalance = walletBalance;
      }

}