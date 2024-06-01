import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository{
    constructor(@InjectRepository(User)
    private userRepository:Repository<User>){

    }
    async saveUser(newUser: User): Promise<User> {
        return this.userRepository.save(newUser);
      }
      async findOneByEmail(userEmail: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email: userEmail } });
      }
      
      async findOneById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id: id } });
      }
}