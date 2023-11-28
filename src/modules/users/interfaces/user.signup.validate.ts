import {IsEmail, IsString, IsEmpty} from "class-validator";

export class SignUpUserValid {
    @IsEmpty() @IsEmail() @IsString()
    email: string;
  
    @IsEmpty() @IsString()
    password: string;

    @IsEmpty() @IsString()
    firstName: string;

    @IsEmpty() @IsString()
    lastName: string;
}