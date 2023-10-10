import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FindReservaDto {
  @IsNotEmpty()
  @IsDate({
    message: 'O campo Data deve ser escrito: ano-mes-dia => YYYY-MM-DD',
  })
  data: Date;

  @IsOptional()
  @IsNumber({}, { message: 'O campo pessoas deve ser um número' })
  pessoas: number;
}
