import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wallet } from "../entities/wallet.entity";
import { Repository } from "typeorm";

@Injectable()
export class WalletRepository{
    constructor(@InjectRepository(Wallet)
    private walletRepository:Repository<Wallet>){

    }
    async saveUser(newWallet: Wallet): Promise<Wallet> {
        return this.walletRepository.save(newWallet);
    }
 
    async findOneById(id: number): Promise<Wallet | undefined> {
        return this.walletRepository.findOne({ where: { id: id } });
    }
}