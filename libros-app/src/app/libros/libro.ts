import { Genero } from './genero';

export class Libro {
  id: number;
  idFoto: number;
  titulo: string;
  autor: string;
  idioma: string;
  generos: Genero[];
  paginas: number;
  anyoPublicacion: number;
  valoracion: number;
}
