import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if(this._usuario != null)
    {
      return this._usuario;
    }
    else if(sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }

    return new Usuario();
  }

  public get token(): string {
    if(this._token != null)
    {
      return this._token;
    }
    else if(sessionStorage.getItem('usuario') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }

    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndpoint: string = 'http://localhost:8080/oauth/token';
    const credenciales: string = btoa('angularapp' + ':' + '1234');
    const httpHeaders = new HttpHeaders(
      {'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post(
      urlEndpoint, params.toString(), {headers: httpHeaders});
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellidos = payload.apellidos;
    this._usuario.correo = payload.correo;
    this._usuario.username = payload.user_name;
    this._usuario.id = payload.id;
    this._usuario.ultimoAcceso = payload.ultimoAcceso;
    this._usuario.fechaNacimiento = payload.fechaNacimiento;
    this._usuario.roles = payload.authorities;

    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;

    sessionStorage.setItem('token', this._token);
  }

  obtenerDatosToken(accessToken: string): any {
    if(accessToken != null)
    {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }

    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);

    return payload != null && payload.user_name && payload.user_name.length > 0;
  }

  hasRole(role: string): boolean {
    return this.usuario.roles.includes(role)
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }
}
