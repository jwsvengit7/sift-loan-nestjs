import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Entity, Column,ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { LoanStatus } from '../enums/loan.type';

@Entity({name:"loan"})
export class Loan extends BaseEntity {
    @Column({
        type: 'enum',
        enum: LoanStatus,
        default: LoanStatus.PENDING,
      })
    _status: LoanStatus;

    tansid:number;

    amount:BigInt;

    @ManyToOne(() => User, user => user.loans, { onDelete: 'CASCADE' })
    user: User;
}
