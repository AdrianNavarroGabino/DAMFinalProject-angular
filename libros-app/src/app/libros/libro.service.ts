import { Injectable } from '@angular/core';
import { Libro } from './libro';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private urlEndPoint: string = 'http://localhost:8080/api/libros';
  //private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getLibros(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page);
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

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }
}
