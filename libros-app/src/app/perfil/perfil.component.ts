import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { AuthService } from '../usuarios/auth.service';
import { UsuarioService } from '../usuarios/usuario.service';
import { ActivatedRoute } from '@angular/router';

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
  availableSeguir: boolean;
  isSeguido: boolean;

  constructor(private authService: AuthService,
      private usuarioService: UsuarioService,
      activatedRoute: ActivatedRoute) {
    this.idUsuario = this.authService.usuario.id;
    activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if(!this.id) {
        this.id = this.authService.usuario.id;
        this.noLibrerias = "Aún no has añadido librerías";
        this.availableSeguir = true;
      }
      else {
        this.noLibrerias = "Aún no ha añadido librerías";
        this.availableSeguir = false;
      }
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

          console.log(this.isSeguido);
          console.log(this.availableSeguir);
        });
      }
    });
  }

}
