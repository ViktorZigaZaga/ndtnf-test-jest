import {IsEmail, IsString, IsEmpty} from "class-validator";

export class SignInUserValid {
    @IsEmpty() @IsEmail() @IsString()
    email: string;

    @IsEmpty() @IsString()
    password: string;
}