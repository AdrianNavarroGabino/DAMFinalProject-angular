import { Component, OnInit } from '@angular/core';
import { Notificacion } from './notificacion';
import { UsuarioService } from '../usuarios/usuario.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html'
})
export class NotificacionesComponent implements OnInit {

  titulo: string = "Notificaciones";
  notificaciones: Notificacion[] = [];

  constructor(private authService: AuthService,
    private usuarioService: UsuarioService) {  }

  ngOnInit(): void {
    this.usuarioService.getUsuario(this.authService.usuario.id)
      .subscribe(response => {
        this.notificaciones = response.notificaciones as Notificacion[];
        this.notificaciones.sort((a, b) => (a.id < b.id) ? 1 : -1);
        this.usuarioService
          .marcarNotificacionesLeidas(this.authService.usuario.id).subscribe();
      });
  }

}
