import { Component, OnInit } from '@angular/core';
import { Libro } from './libro';
import { LibroService } from './libro.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ModalService } from './detalle/modal.service';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
import { AutorService } from './autor.service';

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
    private autorService: AutorService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    public authService: AuthService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      let page = +params.get('page');
      let idGenero = +params.get('idGenero');
      let buscar = params.get('buscar');

      if(!page)
      {
        page = 0;
      }

      if(id) {
        this.autorService.getLibrosPorAutor(id, page).subscribe(response => {
          this.libros = response.content as Libro[];
          this.paginador = response;
        });
      }
      else if(idGenero) {
        this.libroService.getLibrosPorGenero(idGenero, page).subscribe(response => {
          this.libros = response.content as Libro[];
          this.paginador = response;
        });
      }
      else if(buscar && buscar.length > 0) {
        this.libroService.buscarLibros(buscar.replace("-", " "), page).subscribe(response => {
          console.log(response);
          this.libros = response.content as Libro[];
          this.paginador = response;
        })
      }
      else {
        this.libroService.getLibros(page).subscribe(response => {
          this.libros = response.content as Libro[];
          this.paginador = response;
          console.log(response.content);
        });
      }

    });
  }

  delete(libro: Libro): void {
      const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar el libro ${libro.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.libroService.delete(libro.id).subscribe(
          response => {
            this.libros = this.libros.filter(li => li != libro)
            swal.fire(
              'Libro eliminado',
              `Libro ${libro.titulo} eliminado con éxito`,
              'success'
            )
          }
        )
      }
    })
  }

  abrirModal(libro: Libro) {
    this.libroSeleccionado = libro;
    this.modalService.abrirModal();
  }
}
