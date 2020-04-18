import { Estanteria } from './estanteria';

export class Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  username: string;
  correo: string;
  password: string;
  fechaNacimiento: string;
  ultimoAcceso: string;
  accesoActual: string;
  estanterias: Estanteria[] = [];
  roles: string[] = [];
}
