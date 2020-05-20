import { Component, OnInit } from '@angular/core';
import { Libro } from './libro';
import { LibroService } from './libro.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
import { AutorService } from './autor.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html'
})
export class LibrosComponent implements OnInit {

  libros: Libro[];
  paginador: any;
  libroSeleccionado: Libro;
  isAnyadirLibroAvailable: boolean = false;

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
      let idEstanteria = +params.get('idEstanteria');

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
        this.libroService.getLibrosPorGenero(idGenero, page)
          .subscribe(response => {
            this.libros = response.content as Libro[];
            this.paginador = response;
          });
      }
      else if(buscar && buscar.length > 0) {
        this.libroService.buscarLibros(buscar.replace("-", " "), page)
          .subscribe(response => {
            this.libros = response.content as Libro[];
            this.paginador = response;
          })
      }
      else if(idEstanteria) {
        this.libroService.getEstanteria(idEstanteria, page)
          .subscribe(response => {
            this.libros = response.content as Libro[];
            this.paginador = response;
          })
      }
      else {
        this.isAnyadirLibroAvailable = true;
        this.libroService.getLibros(page).subscribe(response => {
          this.libros = response.content as Libro[];
          this.paginador = response;
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
          () => {
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
