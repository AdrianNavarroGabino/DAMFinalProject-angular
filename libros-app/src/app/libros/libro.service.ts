import { Injectable } from '@angular/core';
import { Libro } from './libro';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private urlEndPoint: string = 'http://localhost:8080/api/libros';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.urlEndPoint).pipe(
      map(response => response as Libro[])
    );
  }

  create(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.urlEndPoint, libro, {headers: this.httpHeaders});
  }
}
