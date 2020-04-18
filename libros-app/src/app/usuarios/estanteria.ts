import { Libro } from '../libros/libro';

export class Estanteria {
  id: number;
  nombre: string;
  libros: Libro[] = [];
}
