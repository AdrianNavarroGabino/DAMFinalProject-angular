import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Libro } from '../libros/libro';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  buscar: string = "";
  libros: Libro[];
  paginador: any;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    swal.fire('Cerrar sesión',
      `Hola ${this.authService.usuario.username} has cerrado sesión con éxito`,
      'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  realizarConsulta() {
    if(this.buscar != "") {
      this.router.navigate(['/libros/buscar/' + this.buscar.replace(" ", "-")]);
      this.buscar = "";
    }
  }
}
