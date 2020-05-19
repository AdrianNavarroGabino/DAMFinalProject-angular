import { Estanteria } from './estanteria';
import { Notificacion } from '../notificaciones/notificacion';

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
  estanterias: Estanteria[];
  roles: string[] = [];
  seguidos: Usuario[];
  enabled: boolean;
  notificaciones: Notificacion[];
}
