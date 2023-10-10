import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateMesaDto {
  @IsNotEmpty({ message: 'Você não digitou um número válido' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Você não digitou um número válido' },
  )
  @IsInt({ message: 'O número da mesa deve ser um número inteiro' })
  numero: number;

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Você não digitou um número válido' },
  )
  @IsInt({ message: 'O número de lugares deve ser um número inteiro' })
  @Min(2, { message: 'O número mínimo de lugares nâo pode ser menor que 2' })
  lugares: number;
}
