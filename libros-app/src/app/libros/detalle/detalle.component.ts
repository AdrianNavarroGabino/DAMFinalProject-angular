import { Component, OnInit } from '@angular/core';
import { Libro } from '../libro';
import { LibroService } from '../libro.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'detalle-libro',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  libro: Libro;
  titulo: string = "Detalle del libro";
  fotoSeleccionada: File;

  constructor(private libroService: LibroService,
    private activatedRoute: ActivatedRoute) { }

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

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
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
        .subscribe(libro => {
          this.libro = libro;
          swal.fire(
            'La portada se ha subido correctamente',
            `La portada se ha subido con éxito: ${this.libro.foto}`,
            'success');
        });
    }
  }
}
