import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Iniciar sesión';
  usuario: Usuario;
  anchoLogin: number = window.outerWidth / 2;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router) {
      this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated())
    {
      swal.fire('Login', 'Hola ' + this.authService.usuario.username +
        ', ya estás autenticado', 'info');
      this.router.navigate(['/libros']);
    }
  }

  login(): void {
    if(this.usuario.username == null || this.usuario.password == null)
    {
      swal.fire('Error Login', 'Username o password vacías', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {

      this.usuarioService.actualizarUltimoAcceso(this.usuario.username)
        .subscribe(r => {
          this.authService.guardarUsuario(response.access_token);
          this.authService.guardarToken(response.access_token);

          let usuario = this.authService.usuario;

          this.router.navigate(['/inicio']);
          swal.fire('Login', 'Hola ' + usuario.username +
            ', has iniciado sesión con éxito', 'success');
        })
      }, err => {
        if(err.status == 400) {
          swal.fire('Error Login', 'Username o password incorrectos', 'error');
        }
      });
  }

  registrar() {
    this.router.navigate(['/registro']);
  }

}
