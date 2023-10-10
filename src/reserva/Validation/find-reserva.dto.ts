import { IsDate, IsNotEmpty, IsNumber, IsOptional, MinDate } from 'class-validator';

export class FindReservaDto {
  @IsNotEmpty()
  @IsDate({
    message: 'O campo Data deve ser escrito: ano-mes-dia => YYYY-MM-DD',
  })
  @MinDate(new Date(), {
    message:
      'A data deve ser maior que a data atual, como não pedimos horario obrigatoriamente as reservas duram o dia todo.',
  })
  data: Date;

  @IsOptional()
  @IsNumber({}, { message: 'O campo pessoas deve ser um número' })
  pessoas: number;
}
