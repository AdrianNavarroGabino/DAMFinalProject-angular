import { Injectable } from '@angular/core';
import { Libro } from './libro';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private urlEndPoint: string = 'http://localhost:8080/api/libros';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getLibros(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page);
  }

  getLibro(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/libros']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(libro: Libro): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, libro, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status == 400)
        {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire('Error al añadir', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
