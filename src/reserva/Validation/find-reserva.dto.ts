import { IsISO8601, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FindReservaDto {

    @IsNotEmpty()
    @IsISO8601({strictSeparator: true},{message: 'O campo data deve ser escrito usando separadores na ordem: ano/mes/dia -> YYYY/MM/DD'})
    data: Date;

    @IsOptional()
    @IsNumber({},{message: 'O campo pessoas deve ser um número'})
    pessoas: number;

}
