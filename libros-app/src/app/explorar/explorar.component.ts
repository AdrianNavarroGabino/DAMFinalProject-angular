import { Component, OnInit } from '@angular/core';
import { Genero } from '../libros/genero';
import { GeneroService } from '../libros/genero.service';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import { AuthService } from '../usuarios/auth.service';
import { Autor } from '../libros/autor';
import { AutorService } from '../libros/autor.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html'
})
export class ExplorarComponent implements OnInit {
  generos: Genero[];
  usuarios: Usuario[];
  autores: Autor[];

  constructor(private autorService: AutorService,
    private generoService: GeneroService,
    private usuarioService: UsuarioService,
    authService: AuthService) { }

  ngOnInit(): void {
    this.generoService.getLibros().subscribe(generos => {
      this.generos = generos;
    });

    this.usuarioService.getUsuariosPaginados(0).subscribe(response => {
      this.usuarios = response.content as Usuario[];
    });

    this.autorService.getAutores(0).subscribe(response => {
      this.autores = response.content as Autor[];
    });
  }

}
