import { Component, OnInit } from '@angular/core';
import { Libro } from './libro';
import { LibroService } from './libro.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ModalService } from './detalle/modal.service';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';

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
    private modalService: ModalService,
    public authService: AuthService) { }

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
