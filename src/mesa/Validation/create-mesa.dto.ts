import { Transform, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreateMesaDto {

    @IsNotEmpty({message: 'Você não digitou um número válido'})
    @Type(() => Number)
    @IsNumber({allowInfinity: false, allowNaN: false}, {message: 'Você não digitou um número válido'})
    @Transform( numero => +numero.value)
    @IsInt({message: 'O número de lugares deve ser um número inteiro'})
    numero: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber({allowInfinity: false, allowNaN: false}, {message: 'Você não digitou um número válido'})
    @Transform( numero => +numero.value)
    @IsInt({message: 'O número de lugares deve ser um número inteiro'})
    @Min(2, {message: 'O número mínimo de lugares nâo pode ser menor que 2'})
    lugares: number;

}
