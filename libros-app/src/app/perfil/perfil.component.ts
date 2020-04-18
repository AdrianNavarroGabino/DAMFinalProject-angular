import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { AuthService } from '../usuarios/auth.service';
import { UsuarioService } from '../usuarios/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  titulo: string;
  usuario: Usuario;
  imagePath: string;

  constructor(private authService: AuthService, private usuarioService: UsuarioService) {
    this.usuario = this.authService.usuario;
    this.titulo = "Perfil de " + this.usuario.username;
    this.imagePath = "https://api.adorable.io/avatars/150/" + this.usuario.id;
  }

  ngOnInit(): void {

  }

}
