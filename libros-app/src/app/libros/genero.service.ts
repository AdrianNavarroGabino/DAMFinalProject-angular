import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private urlEndPoint: string = 'http://localhost:8080/api/generos';

  constructor(private http: HttpClient, private router: Router) { }

  getLibros(): Observable<any> {
    return this.http.get(this.urlEndPoint);
  }
}
