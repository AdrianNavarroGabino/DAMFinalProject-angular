import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { AuthService } from '../usuarios/auth.service';
import { UsuarioService } from '../usuarios/usuario.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  titulo: string;
  usuario: Usuario;
  imagePath: string;
  id: number;
  idUsuario: number;
  noLibrerias: string;
  noSeguidos: string;
  availableSeguir: boolean;
  isSeguido: boolean;

  constructor(private authService: AuthService,
      private usuarioService: UsuarioService,
      activatedRoute: ActivatedRoute) {
    this.idUsuario = this.authService.usuario.id;
    activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log('params id: ' + params['id']);
      if(!this.id) {
        this.id = this.authService.usuario.id;
        this.noLibrerias = "Aún no has añadido librerías";
        this.noSeguidos = "Aún no sigues a nadie";
        this.availableSeguir = false;
      }
      else if(this.id && this.id != this.idUsuario) {
        this.noLibrerias = "Aún no ha añadido librerías";
        this.noSeguidos = "Aún no sigue a nadie";
        this.availableSeguir = true;
      }
      console.log('constructor availableSeguir: ' + this.availableSeguir);
    });

    this.usuario = this.authService.usuario;
    this.titulo = "Perfil de " + this.usuario.username;
    this.imagePath = "https://api.adorable.io/avatars/150/" + this.usuario.id;
  }

  ngOnInit(): void {
    this.usuarioService.getUsuario(this.id).subscribe(response => {
      this.usuario = response as Usuario;
      this.titulo = "Perfil de " + this.usuario.username;
      this.imagePath = "https://api.adorable.io/avatars/150/" + this.usuario.id;

      if(this.id != this.idUsuario) {
        this.usuarioService.getSeguido(this.idUsuario, this.id).subscribe(response => {
          this.availableSeguir = true;
          if(response != null) {
            this.isSeguido = true;
          }
          else {
            this.isSeguido = false;
          }
        });
      }
    });
  }

  seguir() {
    this.usuarioService.seguirUsuario(this.idUsuario, this.usuario).subscribe();
    this.usuarioService.addNotificacion(this.id, this.authService.usuario.username + ' ha empezado a seguirte').subscribe();
    this.isSeguido = true;
  }

  dejarDeSeguir() {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que quieres dejar de seguir a ${this.usuario.nombre} ${this.usuario.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Dejar de seguir',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.usuarioService.dejarDeSeguir(this.idUsuario, this.usuario).subscribe();

        this.isSeguido = false;
      }
    })
  }
}
