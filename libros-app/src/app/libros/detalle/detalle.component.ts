import { Component, OnInit, Input } from '@angular/core';
import { Libro } from '../libro';
import { ModalService } from './modal.service';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Usuario } from 'src/app/usuarios/usuario';
import { UsuarioService } from 'src/app/usuarios/usuario.service';
import { Estanteria } from 'src/app/usuarios/estanteria';
import swal from 'sweetalert2';
import { LibroService } from '../libro.service';

@Component({
  selector: 'detalle-libro',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() libro: Libro;
  titulo: string = "Detalle del libro";
  tituloAnyadir: string = "Guardar libro"
  usuario: Usuario;
  nuevaEstanteria: string = "";

  constructor(private usuarioService: UsuarioService,
    public libroService: LibroService,
    public modalService: ModalService,
    public authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.hasRole('ROLE_USER')) {
      this.usuarioService.getUsuario(this.authService.usuario.id)
        .subscribe(usuario => {
          this.usuario = usuario;
        })
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.nuevaEstanteria = "";
  }

  abrirModalAnyadir() {
    this.modalService.cerrarModal();
    this.modalService.abrirAnyadir();
  }

  cerrarModalAnyadir() {
    this.modalService.cerraAnyadir();
    this.nuevaEstanteria = "";
  }

  crearEstanteria(libro: Libro) {
    this.usuarioService.guardarEstanteria(this.nuevaEstanteria, this.usuario.id)
      .subscribe(response => {
        this.nuevaEstanteria = "";

        let estanteria: Estanteria;
        if(response != null) {
          estanteria = response as Estanteria;
        }
        else {
          this.usuarioService
            .getEstanteria(this.nuevaEstanteria, this.usuario.id)
            .subscribe(r => {
              estanteria = r as Estanteria;
            });
        }

        this.usuarioService.addEstanteria(this.nuevaEstanteria, this.usuario.id)
          .subscribe();

        this.usuarioService.guardarLibroEstanteria(estanteria.id, libro)
          .subscribe(() => {
            swal.fire(
              'Libro añadido',
              `Libro ${this.libro.titulo} añadido a la estantería ${estanteria.nombre}`,
              'success');

            this.cerrarModalAnyadir();
          });
      });
  }

  anyadirLibro(idEstanteria: number, estanteriaNombre: string) {
    this.libroService.getLibro(this.libro.id).subscribe(libro => {
      this.usuarioService.guardarLibroEstanteria(idEstanteria, libro)
        .subscribe(() => {
          swal.fire(
            'Libro añadido',
            `Libro ${libro.titulo} añadido a la estantería ${estanteriaNombre}`,
            'success');

          this.cerrarModalAnyadir();
        });
    })
  }
}
