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
  anchoImagen: number = 350 * window.outerWidth / 2300;

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
    let existe: boolean = false;

    this.usuario.estanterias.forEach(e => {
      if(e.nombre == this.nuevaEstanteria) {
        this.anyadirLibro(e.id, e.nombre);
        existe = true;
      }
    });
    console.log(this.nuevaEstanteria);

    if(!existe) {
      this.usuarioService.addEstanteria(this.nuevaEstanteria, this.usuario.id)
        .subscribe(usuario => {
          this.anyadirLibro(
            usuario.estanterias[usuario.estanterias.length - 1].id,
            usuario.estanterias[usuario.estanterias.length - 1].nombre);
          this.usuario = usuario;
        });
    }
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
