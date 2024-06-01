import { BaseEntity } from './base.entity';
import { Entity, Column,ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Status } from '../enums/user.type';

@Entity({name:"accounts"})
export class Account extends BaseEntity {
    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING,
      })
      @Column({name:"bank_name"})
      bankName:string;

      @Column({name:"bank_account_number"})

      bankAccountNo:number;
      @Column({name:"account_name"})
      acountName:string;

    _status: Status;
    @ManyToOne(() => User, user => user.loans, { onDelete: 'CASCADE' })
    user: User;
}
