import { IsBoolean, IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword({
        minLength:3,
        minNumbers:1,
        minLowercase:0,
        minUppercase:1,
        minSymbols:0,
    })
    password: string;

    @IsOptional()
    @IsBoolean()
    role: boolean;

}
