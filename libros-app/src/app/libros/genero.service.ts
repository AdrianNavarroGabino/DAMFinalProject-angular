import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private urlEndPoint: string = 'http://localhost:8080/api/generos';

  constructor(private http: HttpClient) { }

  getLibros(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page);
  }
}
