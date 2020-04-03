import { Component, OnInit } from '@angular/core';
import { Libro } from './libro';
import { LibroService } from './libro.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  libros: Libro[];
  paginador: any;
  libroSeleccionado: Libro;

  constructor(private libroService: LibroService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService) { }

  ngOnInit(): void {

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
    });

    this.modalService.notificarUpload.subscribe(libro => {
      this.libros = this.libros.map(libroOriginal => {
        if(libro.id == libroOriginal.id)
        {
          libroOriginal.foto = libro.foto;
        }
        return libroOriginal;
      })
    })
  }

  abrirModal(libro: Libro) {
    this.libroSeleccionado = libro;
    this.modalService.abrirModal();
  }
}
