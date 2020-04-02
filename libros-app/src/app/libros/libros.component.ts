import { Component, OnInit } from '@angular/core';
import { Libro } from './libro';
import { LibroService } from './libro.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  libros: Libro[];
  adapt: number;
  paginador: any;

  constructor(private libroService: LibroService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(window.screen.width > 850)
    {
      this.adapt = 0;
    }
    else if(window.screen.width > 600)
    {
      this.adapt = 1;
    }
    else
    {
      this.adapt = 2;
    }

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if(!page)
      {
        page = 0;
      }

      this.libroService.getLibros(page).pipe(
        tap(response => {
          console.log('ClientesComponent: Tap 3');
          (response.content as Libro[]).forEach( libro => {
            console.log(libro.titulo);
          });
        })
      ).subscribe(response => {
        this.libros = response.content as Libro[];
        this.paginador = response;
        console.log(response.content);
      });
    })
  }

}
