import { Component, OnInit, Input } from '@angular/core';
import { Libro } from '../libro';
import { LibroService } from '../libro.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Usuario } from 'src/app/usuarios/usuario';

@Component({
  selector: 'detalle-libro',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() libro: Libro;
  titulo: string = "Detalle del libro";
  tituloAnyadir: string = "Guardar libro"
  fotoSeleccionada: File;
  progreso: number = 0;
  usuario: Usuario;
  nuevaEstanteria: string = "";

  constructor(private libroService: LibroService,
    public modalService: ModalService,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.fotoSeleccionada = null;
    this.progreso = 0;
    this.modalService.cerrarModal();
  }

  abrirModalAnyadir() {
    this.modalService.cerrarModal();
    this.modalService.abrirAnyadir();
    this.usuario = this.authService.usuario;
  }

  cerrarModalAnyadir() {
    this.modalService.cerraAnyadir();
  }

  crearEstanteria() {
    console.log(this.nuevaEstanteria);
  }
}
