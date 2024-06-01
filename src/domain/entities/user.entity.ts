import { validateEmail } from "../../helpers/email.helper";
import { UserType, Status } from "../enums/user.type";
import { Entity, Column, OneToOne,OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from "./base.entity";
import { Wallet } from "./wallet.entity";
import { Loan } from "./loan.entity";
import { OTP } from "./otp.entity";

@Entity({name:"users"})
export class User extends BaseEntity {

  @Column({name:"_name"})
  private _name: string;

  @Column({ name: "email_address" })
  private _email: string;

  @Column({name: "user_password" })
  private _password: string;

  @Column({ name: "phone_number" })
  private _phone: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  private _status: Status;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  private _role: UserType;

  @OneToOne(() => Wallet, wallet => wallet.user, { cascade: true })
  @JoinColumn() 
   wallet: Wallet;

  @OneToOne(() => OTP, userOTP => userOTP.user,{ cascade: true })
  userOTP: OTP;

  @OneToMany(() => Loan, loan => loan.user,{ cascade: true })
  loans: Loan[];


  get name(): string {
    return this._name;
  }

  set name(name: string) {
    if (name.length < 2) {
      throw new Error('Name is too short');
    }
    this._name = name;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    if (!validateEmail(email)) {
      throw new Error('Invalid email address');
    }
    this._email = email;
  }
 
  get password(): string {
    return this._password;
  }

  set password(password: string) {
    if (password.length < 6) {
      throw new Error('Password is too short');
    }
    this._password = password;
  }
  get phone(): number {
    return this._phone;
  }

  set phone(phone: number) {
    this._phone = phone;
  }

  get status(): Status {
    return this._status;
  }

  set status(status: Status) {
    this._status = status;
  }

  get role(): UserType {
    return this._role;
  }

  set role(role: UserType) {
    this._role = role;
  }
}



