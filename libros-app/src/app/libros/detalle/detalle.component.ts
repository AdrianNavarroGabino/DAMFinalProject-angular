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

  cerrarModal() {
    this.fotoSeleccionada = null;
    this.progreso = 0;
    this.modalService.cerrarModal();
  }
}
