import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Estanteria } from './estanteria';
import { Libro } from '../libros/libro';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint: string = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlEndPoint).pipe(
      map(response => response as Usuario[])
    );
  }

  getUsuariosPaginados(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`);
  }

  create(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, usuario).pipe(
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

  getSeguido(idSeguidor: number, idSeguido: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${idSeguidor}/${idSeguido}`);
  }

  getEstanteria(nombreEstanteria: string, idUsuario: number): Observable<Estanteria> {
    return this.http.get<Estanteria>(this.urlEndPoint + '/' + idUsuario + '/estanterias/' + nombreEstanteria);
  }

  guardarEstanteria(nombreEstanteria: string, idUsuario: number): Observable<any> {
    this.getEstanteria(nombreEstanteria, idUsuario).subscribe(response => {
      let estanteriaBuscar = response as Estanteria;

      if(estanteriaBuscar == null) {
        const estanteria = new Estanteria();
        estanteria.nombre = nombreEstanteria;

        return this.http.post<any>(this.urlEndPoint + '/estanterias', estanteria).pipe(
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
    });

    return null;
  }

  addEstanteria(nombreEstanteria: string, id: number): Observable<any> {
    const estanteria = new Estanteria();
    estanteria.nombre = nombreEstanteria;

    return this.http.put<any>(this.urlEndPoint + '/' + id + '/estanterias', estanteria).pipe(
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

  guardarLibroEstanteria(idEstanteria: number, libro: Libro): Observable<any> {
    return this.http.put<any>(this.urlEndPoint + '/estanterias/' + idEstanteria, libro).pipe(
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

  seguirUsuario(idSeguidor: number, seguido: Usuario): Observable<Usuario> {
    return this.http.put<any>(this.urlEndPoint + '/' + idSeguidor, seguido).pipe(
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

  dejarDeSeguir(idSeguidor: number, seguido: Usuario): Observable<Usuario> {
    return this.http.put<any>(this.urlEndPoint + '/unfollow/' + idSeguidor, seguido).pipe(
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

  actualizarUltimoAcceso(username: string): Observable<Usuario> {
    return this.http.put<any>(this.urlEndPoint + '/ultimoacceso/' + username, null).pipe(
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
    )
  }
}
