import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from './genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private urlEndPoint: string = 'http://localhost:8080/api/generos';

  constructor(private http: HttpClient) { }

  getGeneros(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.urlEndPoint);
  }

  getLibros(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page);
  }

  getGenero(id: number): Observable<Genero> {
    return this.http.get<Genero>(this.urlEndPoint + '/' + id);
  }
}
