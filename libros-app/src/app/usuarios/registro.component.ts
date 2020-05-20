import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';
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

  constructor(
    private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.usuario.estanterias = [];
    this.usuario.roles = [];
    this.usuario.seguidos = [];
    this.usuario.enabled = true;

    this.usuarioService.create(this.usuario).subscribe(
      response => {
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
