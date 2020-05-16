import { Component, OnInit } from '@angular/core';
import { Libro } from '../libros/libro';
import { LibroService } from '../libros/libro.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../libros/detalle/modal.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  libros: Libro[];
  libroSeleccionado: Libro;

  constructor(private libroService: LibroService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.libroService.getLibrosAleatorios().subscribe(response => {
      this.libros = response;
    })
  }

  abrirModal(libro: Libro) {
    this.libroSeleccionado = libro;
    this.modalService.abrirModal();
  }
}
