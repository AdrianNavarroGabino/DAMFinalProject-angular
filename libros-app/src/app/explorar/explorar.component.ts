import { Component, OnInit } from '@angular/core';
import { Genero } from '../libros/genero';
import { GeneroService } from '../libros/genero.service';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import { AuthService } from '../usuarios/auth.service';
import { Autor } from '../libros/autor';
import { AutorService } from '../libros/autor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html'
})
export class ExplorarComponent implements OnInit {
  generos: Genero[];
  usuarios: Usuario[];
  autores: Autor[];
  paginador: any;

  isGeneros: boolean = false;
  isAutores: boolean = false;
  isLectores: boolean = false;

  constructor(private autorService: AutorService,
    private generoService: GeneroService,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.router.url == "/explorar/generos/page/0") {
      this.isGeneros = true;
      this.activatedRoute.paramMap.subscribe(params => {
        let page = +params.get('page');
        if(!page)
        {
          page = 0;
        }

        this.generoService.getLibros(page).subscribe(response => {
          this.generos = response.content as Genero[];
          this.paginador = response;
        });
      })
    }
    else if(this.router.url == "/explorar/autores/page/0") {
      this.isAutores = true;
      this.activatedRoute.paramMap.subscribe(params => {
        let page = +params.get('page');
        if(!page)
        {
          page = 0;
        }

        this.autorService.getAutores(page).subscribe(response => {
          this.autores = response.content as Autor[];
          this.paginador = response;
        });
      })
    }
    else if(this.router.url == "/explorar/lectores/page/0") {
      this.isLectores = true;
      this.activatedRoute.paramMap.subscribe(params => {
        let page = +params.get('page');
        if(!page)
        {
          page = 0;
        }

        this.usuarioService.getUsuariosPaginados(page).subscribe(response => {
          this.usuarios = response.content as Usuario[];
          this.paginador = response;
        });
      })
    }
    else {
      this.generoService.getLibros(0).subscribe(response => {
        this.generos = response.content as Genero[];
        this.paginador = response;
      });

      this.usuarioService.getUsuariosPaginados(0).subscribe(response => {
        this.usuarios = response.content as Usuario[];
        this.paginador = response;
      });

      this.autorService.getAutores(0).subscribe(response => {
        this.autores = response.content as Autor[];
        this.paginador = response;
      });
    }
  }

  abrirGeneros() {
    this.router.navigate(['/explorar/generos/page/0']);
  }

  abrirAutores() {
    this.router.navigate(['/explorar/autores/page/0']);
  }

  abrirLectores() {
    this.router.navigate(['/explorar/lectores/page/0']);
  }

}
