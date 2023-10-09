import { IsBoolean, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";

export class ValidateReservaDto {

    @IsNotEmpty()
    @IsISO8601({strictSeparator: true},{message: 'O campo data deve ser escrito usando separadores na ordem: ano/mes/dia -> YYYY/MM/DD'})
    data: Date;

    @IsNotEmpty()
    @IsBoolean()
    juntarMesas: boolean;

    @IsOptional()
    @IsNumber({},{message: 'O campo pessoas deve ser um número'})
    pessoas: number;

}