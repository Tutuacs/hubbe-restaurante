import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  MinDate,
} from 'class-validator';

export class CreateAnyReservaDto {
  @IsNotEmpty()
  @IsDate({
    message: 'O campo Data deve ser escrito: ano-mes-diaTHora24 => YYYY-MM-DDTHora24, digite uma hora entre 00 e 23 após o T',
  })
  @MinDate(new Date(), {
    message:
      'A data deve ser maior que a data atual, como não pedimos horario obrigatoriamente as reservas duram o dia todo.',
  })
  data: Date;

  @IsNotEmpty()
  @IsBoolean()
  juntarMesas: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'O campo pessoas deve ser um número' })
  @Min(1, { each: true })
  pessoas: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  mesas: number[];
}
