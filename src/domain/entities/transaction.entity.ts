import { Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({name:"TRANSACTION_TB"})
export class Transaction extends BaseEntity{

}