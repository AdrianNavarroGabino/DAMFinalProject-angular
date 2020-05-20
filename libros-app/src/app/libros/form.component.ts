import { Component, OnInit } from '@angular/core';
import { Libro } from './libro';
import { Router, ActivatedRoute } from '@angular/router';
import { LibroService } from './libro.service';
import swal from 'sweetalert2';
import { Genero } from './genero';
import { GeneroService } from './genero.service';
import { AutorService } from './autor.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public libro: Libro = new Libro();
  public tituloForm: String = "Añadir libro";
  private errores: string[] = [];
  public generos: Genero[];
  public generoSeleccionado: number;
  public autorSeleccionado: string;
  public textoBoton: string = "Añadir libro";
  public editar: boolean = false;

  constructor(private libroService: LibroService,
    private generoService: GeneroService,
    private autorService: AutorService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.generoService.getGeneros().subscribe(response => {
      this.generos = response as Genero[];
    });
    this.cargarLibro();
  }

  cargarLibro(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id) {
        this.textoBoton = "Editar libro";
        this.editar = true;
        this.libroService.getLibro(id).subscribe(libro => {
          this.libro = libro

          this.autorSeleccionado = libro.autor.nombre;
          this.generoSeleccionado = libro.generos[0].id;
        })
      }
    });
  }

  public create(): void {
    if(this.generoSeleccionado != undefined) {
      this.generoService.getGenero(this.generoSeleccionado).subscribe(genero => {
        let g = new Genero();
        g.id = genero.id;
        g.nombre = genero.nombre;

        this.libro.generos = [];
        this.libro.generos.push(g);

        this.autorService.getAutor(this.autorSeleccionado).subscribe(autor => {
          if(autor == null) {
            this.autorService.addAutor(this.autorSeleccionado).subscribe(a => {
              this.libro.autor = a;

              if(!this.editar) {
                this.libroService.create(this.libro).subscribe(() => {
                  this.router.navigate(['/libros']);

                  swal.fire(
                    'Nuevo libro',
                    `Libro ${this.libro.titulo} añadido con éxito`,
                    'success');
                });
              }
              else {
                this.libroService.update(this.libro).subscribe(() => {
                  this.router.navigate(['/libros']);

                  swal.fire(
                    'Libro editado',
                    `Libro ${this.libro.titulo} editado con éxito`,
                    'success');
                })
              }
            })
          }
          else {
            this.libro.autor = autor;

            if(!this.editar) {
              this.libroService.create(this.libro).subscribe(() => {
                this.router.navigate(['/libros']);

                swal.fire(
                  'Nuevo libro',
                  `Libro ${this.libro.titulo} añadido con éxito`,
                  'success');
              });
            }
            else {
              this.libroService.update(this.libro).subscribe(() => {
                this.router.navigate(['/libros']);

                swal.fire(
                  'Libro editado',
                  `Libro ${this.libro.titulo} editado con éxito`,
                  'success');
              })
            }
          }
        })
      })
    }
    else {
      this.autorService.getAutor(this.autorSeleccionado).subscribe(autor => {
        if(autor == null) {
          this.autorService.addAutor(this.autorSeleccionado).subscribe(a => {
            this.libro.autor = a;

            if(!this.editar) {
              this.libroService.create(this.libro).subscribe(() => {
                this.router.navigate(['/libros']);

                swal.fire(
                  'Nuevo libro',
                  `Libro ${this.libro.titulo} añadido con éxito`,
                  'success');
              });
            }
            else {
              this.libroService.update(this.libro).subscribe(() => {
                this.router.navigate(['/libros']);

                swal.fire(
                  'Libro editado',
                  `Libro ${this.libro.titulo} editado con éxito`,
                  'success');
              })
            }
          })
        }
        else {
          this.libro.autor = autor;

          if(!this.editar) {
            this.libroService.create(this.libro).subscribe(() => {
              this.router.navigate(['/libros']);

              swal.fire(
                'Nuevo libro',
                `Libro ${this.libro.titulo} añadido con éxito`,
                'success');
            });
          }
          else {
            this.libroService.update(this.libro).subscribe(() => {
              this.router.navigate(['/libros']);

              swal.fire(
                'Libro editado',
                `Libro ${this.libro.titulo} editado con éxito`,
                'success');
            })
          }
        }
      })
    }
  }
}
