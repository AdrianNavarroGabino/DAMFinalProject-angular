import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint: string = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlEndPoint).pipe(
      map(response => response as Usuario[])
    );
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`);
  }
}
