import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    swal.fire('Cerrar sesión', `Hola ${this.authService.usuario.username} has cerrado sesión con éxito`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
