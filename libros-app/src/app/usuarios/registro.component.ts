import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  public tituloForm: String = "Registro";
  private errores: string[];

  constructor(private usuarioService: UsuarioService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  create(): void {
    /*let hoy = new Date();
    this.usuario.ultimoAcceso = hoy.getFullYear() + "-" +
      (hoy.getMonth() < 10 ? "0" : "") + hoy.getMonth() +
      "-" + (hoy.getDay() < 10 ? "0" : "") + hoy.getDay() + " " +
      (hoy.getHours() < 10 ? "0" : "") + hoy.getHours() + ":" +
      (hoy.getMinutes() < 10 ? "0" : "") + hoy.getMinutes() +
      ":" + (hoy.getSeconds() < 10 ? "0" : "") + hoy.getSeconds() + "." +
      hoy.getMilliseconds();
    this.usuario.accesoActual = this.usuario.ultimoAcceso;*/
    this.usuario.estanterias = [];
    this.usuario.roles = [];
    this.usuario.seguidos = [];

    this.usuarioService.create(this.usuario).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/login']);
        swal.fire(
          'Nuevo usuario',
          `Usuario ${response.usuario.nombre} ${response.usuario.apellidos} registrado con éxito`,
          'success');
      },
      err => {
       this.errores = err.error.errors as string[];
       console.error('Código de error desde el backend: ' + err.status);
       console.error(err.error.errors);
      }
    );
  }
}
