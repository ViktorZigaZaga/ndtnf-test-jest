import {IsBoolean, IsDefined, IsEmail, IsOptional, IsString, IsEmpty} from "class-validator";

export class BookDtoValidate {
    @IsEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    authors?: string;

    @IsOptional()
    @IsString()
    favorite?: string;

    @IsOptional()
    @IsString()
    fileCover?: string;

    @IsOptional()
    @IsString()
    fileName?: string;

    @IsOptional()
    @IsString()
    fileBook?: string;
}