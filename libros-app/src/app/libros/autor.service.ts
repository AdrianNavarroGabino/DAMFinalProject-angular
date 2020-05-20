import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Autor } from './autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private urlEndPoint: string = 'http://localhost:8080/api/autores';

  constructor(private http: HttpClient) { }

  getAutores(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page);
  }

  getLibrosPorAutor(id: number, page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/' + id + '/page/' + page);
  }

  getAutor(nombre: string): Observable<any> {
    return this.http.get(this.urlEndPoint + '/' + nombre.replace(" ", "_"));
  }

  addAutor(nombre: string): Observable<any> {
    let autor = new Autor();
    autor.nombre = nombre;
    return this.http.post(this.urlEndPoint, autor);
  }
}
