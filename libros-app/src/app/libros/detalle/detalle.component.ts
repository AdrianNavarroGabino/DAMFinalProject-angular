import { Component, OnInit, Input } from '@angular/core';
import { Libro } from '../libro';
import { LibroService } from '../libro.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'detalle-libro',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() libro: Libro;
  titulo: string = "Detalle del libro";
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private libroService: LibroService,
    public modalService: ModalService,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);

    if(this.fotoSeleccionada.type.indexOf('image') < 0)
    {
      swal.fire('Error seleccionar imagen:', 'El archivo debe ser de tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {

    if(!this.fotoSeleccionada) {
      swal.fire('Error upload:', 'Debe seleccionar una foto', 'error');
    }
    else {
      this.libroService.subirFoto(this.fotoSeleccionada, this.libro.id)
        .subscribe(event => {
          if(event.type === HttpEventType.UploadProgress)
          {
            this.progreso = Math.round(event.loaded / event.total * 100);
          }
          else if(event.type === HttpEventType.Response)
          {
            let response: any = event.body;
            this.libro = response.libro as Libro;

            this.modalService.notificarUpload.emit(this.libro);

            swal.fire(
              'La portada se ha subido correctamente',
              response.mensaje,
              'success');
          }
        });
    }
  }

  cerrarModal() {
    this.fotoSeleccionada = null;
    this.progreso = 0;
    this.modalService.cerrarModal();
  }
}
