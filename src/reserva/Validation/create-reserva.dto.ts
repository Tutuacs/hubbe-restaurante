export class CreateReservaDto {
  data: Date;
  
  dataEnd: Date;

  usuarioId: string;

  mesaId: Array<string>;

  pessoas: number;
}
