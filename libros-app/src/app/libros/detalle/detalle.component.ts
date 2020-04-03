import { Component, OnInit } from '@angular/core';
import { Libro } from '../libro';
import { LibroService } from '../libro.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'detalle-libro',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  libro: Libro;
  titulo: string = "Detalle del libro";

  constructor(private libroService: LibroService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if(id)
      {
        this.libroService.getLibro(id).subscribe(libro => {
          this.libro = libro;
        })
      }
    })
  }
}
