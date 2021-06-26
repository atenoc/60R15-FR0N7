import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URI = 'http://localhost:4000/api/usuarios';
  correo = 'correo';

  constructor(private http: HttpClient) { }

  createUsuario(nombre: string, correo: string, rol: string) {
    return this.http.post(`${this.URI}`, {nombre,correo,rol});
  }

  getUsuarios() {
    return this.http.get<Usuario[]>(this.URI);
  }

  getUsuario(id: string) {
    return this.http.get<Usuario>(`${this.URI}/${id}`);
  }

  deleteUsuario(id: string) {
    return this.http.delete(`${this.URI}/${id}`);
  }

  updateUsuario(id: string, nombre: string, correo: string, rol:string) {
    return this.http.put(`${this.URI}/${id}`, {nombre, correo, rol});
  }

  getUsuarioXcorreo(correo: string): Observable <Usuario> {
    return this.http.get<Usuario>(`${this.URI}/${this.correo}/${correo}`);
  }
/*
  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }
*/

}
