import { Autor } from './autor';

export class Libro {
  id: number;
  titulo: string;
  isbn10: string;
  isbn13: string;
  editorial: string;
  fechaPublicacion: string;
  autores: Autor[];
  foto: string;
}
