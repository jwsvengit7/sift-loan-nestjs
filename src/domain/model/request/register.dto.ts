import { IsEmail, IsNotEmpty } from "class-validator";
export class RegisterDto {
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    fullName:string;

   
    phone:number;

    @IsNotEmpty()
    nin:string;

    @IsNotEmpty()
    bvn:string;

    @IsNotEmpty()
    dob:string;
}