import { Genero } from './genero';
import { Autor } from './autor';

export class Libro {
  id: number;
  idFoto: number;
  titulo: string;
  autor: Autor;
  idioma: string;
  generos: Genero[];
  paginas: number;
  anyoPublicacion: number;
  valoracion: number;
}
