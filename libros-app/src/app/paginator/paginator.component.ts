import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() paginador: any;
  paginas: number[];

  desde: number;
  hasta: number;

  ruta: string;

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      let id = +params.get('id');
      let idGenero = +params.get('idGenero');
      let buscar = params.get('buscar');

      if(id) {
        this.ruta = "/autor/" + id + "/page";
      }
      else if(idGenero) {
        this.ruta = "/libros/generos/" + idGenero + "/page";
      }
      else if(buscar) {
        this.ruta = "/libros/buscar/" + buscar.replace("-", " ") + "/page";
      }
      else {
        this.ruta = "/libros/page";
      }
    })

    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let paginadorActualizado = changes['paginador'];

    if(paginadorActualizado.previousValue)
    {
     this.initPaginator();
    }
  }

  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginador.number - 2), this.paginador.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 3), 6);

    if(this.paginador.totalPages > 5)
    {
      this.paginas = new Array(this.hasta - this.desde + 1)
                        .fill(0)
                        .map((_valor, indice) => indice + this.desde);
    }
    else
    {
      this.paginas = new Array(this.paginador.totalPages)
                        .fill(0)
                        .map((_valor, indice) => indice + 1);
    }
  }
}
