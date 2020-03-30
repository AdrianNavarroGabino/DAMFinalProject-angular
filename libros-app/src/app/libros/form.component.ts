import { Component, OnInit } from '@angular/core';
import { Libro } from './libro';
import { Router } from '@angular/router';
import { LibroService } from './libro.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public libro: Libro = new Libro();
  public titulo: String = "Añadir libro";

  constructor(private libroService: LibroService, private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void {
    this.libroService.create(this.libro).subscribe(
      response => {
        this.router.navigate(['/libros'])
        swal.fire(
          'Nuevo libro',
          `Libro ${response.libro.titulo} añadido con éxito`,
          'success');
      }
    );
  }
}
