import { Injectable } from '@angular/core';
import { Libro } from './libro';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private urlEndPoint: string = 'http://localhost:8080/api/libros';

  constructor(private http: HttpClient, private router: Router) { }

  getLibros(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page);
  }

  getLibrosAleatorios(): Observable<any> {
    return this.http.get(this.urlEndPoint + "/rnd");
  }

  getLibro(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        if(e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/libros']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  getLibrosPorGenero(idGenero: number, page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/generos/' + idGenero + '/page/' + page);
  }

  getEstanteria(idEstanteria: number, page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/estanterias/' + idEstanteria + '/page/' + page);
  }

  buscarLibros(buscar: string, page: number): Observable<any> {
    return this.http.post(this.urlEndPoint + '/buscar/page/' + page, buscar);
  }

  create(libro: Libro): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, libro).pipe(
      catchError(e => {

        if(e.status == 400 && e.error.mensaje)
        {
         return throwError(e);
        }

        if(e.error.mensaje)
        {
         console.error(e.error.mensaje);
        }
        return throwError(e);
     })
    );
  }

  update(libro: Libro): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${libro.id}`, libro).pipe(
      catchError(e => {

        if(e.status == 400)
        {
          return throwError(e);
        }
        if(e.error.mensaje)
        {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Libro> {
    return this.http.delete<Libro>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        if(e.error.mensaje)
        {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
