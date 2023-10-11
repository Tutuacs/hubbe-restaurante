import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinDate,
} from 'class-validator';

export class ValidateReservaDto {
  @IsNotEmpty()
  @IsDate({
    message: 'O campo Data deve ser escrito: ano-mes-diaTHora24:Minuto:Segundo => YYYY-MM-DDTHH:MM:SS, digite uma hora entre 00 e 23 após o T',
  })
  @MinDate(new Date(), {
    message:
      'A data deve ser maior que a data atual, fique atento ao digitar o horário da reserva, supomos que cada reseva tenha no maximo 1hora de ocupação na mesa.',
  })
  data: Date;

  @IsNotEmpty()
  @IsBoolean()
  juntarMesas: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'O campo pessoas deve ser um número' })
  pessoas: number;
}
