import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";

export class ValidateReservaDto {

    @IsNotEmpty()
    @IsDate({message: "O campo Data deve ser escrito: ano-mes-dia => YYYY-MM-DD"},)
    data: Date;

    @IsNotEmpty()
    @IsBoolean()
    juntarMesas: boolean;

    @IsOptional()
    @IsNumber({},{message: 'O campo pessoas deve ser um número'})
    pessoas: number;

}