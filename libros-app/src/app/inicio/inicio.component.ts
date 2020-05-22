import { Component, OnInit } from '@angular/core';
import { Libro } from '../libros/libro';
import { LibroService } from '../libros/libro.service';
import { ModalService } from '../libros/detalle/modal.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  libros: Libro[];
  libroSeleccionado: Libro;
  anchoImagen: number = window.outerWidth * 300 / 2560;
  movil: boolean = false;

  constructor(private libroService: LibroService,
    private modalService: ModalService,
    public authService: AuthService) { }

  ngOnInit(): void {
    if(window.outerWidth <= 425) {
      this.movil = true;
      this.anchoImagen = window.outerWidth * 0.7;
    }
    this.getLibros()
  }

  abrirModal(libro: Libro) {
    this.libroSeleccionado = libro;
    this.modalService.abrirModal();
  }

  getLibros() {
    this.libroService.getLibrosAleatorios().subscribe(response => {
      this.libros = response;
    });
  }
}
