import { Component, OnInit } from '@angular/core';
import { Libro } from './libro';
import { Router, ActivatedRoute } from '@angular/router';
import { LibroService } from './libro.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public libro: Libro = new Libro();
  public tituloForm: String = "Añadir libro";
  private errores: string[];

  constructor(private libroService: LibroService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarLibro();
  }

  cargarLibro(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id) {
        this.libroService.getLibro(id).subscribe(libro => this.libro = libro)
      }
    });
  }

  public create(): void {
    this.libroService.create(this.libro).subscribe(
      response => {
        this.router.navigate(['/libros'])
        swal.fire(
          'Nuevo libro',
          `Libro ${response.libro.titulo} añadido con éxito`,
          'success');
      },
      err => {
       this.errores = err.error.errors as string[];
       console.error('Código de error desde el backend: ' + err.status);
       console.error(err.error.errors);
      }
    );
  }

  update(): void {

    this.libroService.update(this.libro).subscribe(
      json => {
        this.router.navigate(['/libro'])
        swal.fire(
          'Libro actualizado',
          `Libro ${json.libro.titulo} actualizado con éxito`,
          'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
}
