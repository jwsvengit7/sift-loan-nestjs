import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import * as dotenv from 'dotenv';
dotenv.config();
const secret=process.env.JWT_SECRET as string;
@Injectable()
export class JWTStartegy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:secret
        })
    }
    async validate(payload:any){
        return {userId:payload.sub,username:payload.userEmail}
    }

}