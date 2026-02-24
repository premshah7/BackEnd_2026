import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsEmail({},{
        message:'enter valid email'
    })
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string
}