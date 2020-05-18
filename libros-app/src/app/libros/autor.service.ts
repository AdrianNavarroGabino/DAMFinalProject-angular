import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
}
