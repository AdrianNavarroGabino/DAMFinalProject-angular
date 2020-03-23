import { Component, OnInit } from '@angular/core';
import { Libro } from './libro';
import { LibroService } from './libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  libros: Libro[];
  adapt: number;

  constructor(private libroService: LibroService) { }

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
    this.libroService.getLibros().subscribe(
      libros => this.libros = libros
    );
  }

}
