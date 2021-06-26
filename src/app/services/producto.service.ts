import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  URI = 'http://localhost:4000/api/productos';
  cat: string = "cat"

  constructor(private http: HttpClient) { }

              //precio number o string

  createProducto(nombre: string, categoria: string, descripcion: string, precio:string, imagen: File, uid:string){
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('categoria', categoria);
    fd.append('descripcion', descripcion);
    fd.append('precio', precio);
    fd.append('imagen', imagen);
    fd.append('uid', uid)

    return this.http.post(this.URI, fd);  
  }

  getProductos() {
    return this.http.get<Producto[]>(this.URI);
  }

  getProducto(id: string) {
    return this.http.get<Producto>(`${this.URI}/${id}`);
  }

  deleteProducto(id: string) {
    return this.http.delete(`${this.URI}/${id}`);
  }

  // precio string o number
  updateProducto(id:string, nombre:string, categoria:string, descripcion:string, precio:Number, disponible:boolean) {
    return this.http.put(`${this.URI}/${id}`, {nombre, categoria,descripcion,precio,disponible});
  }

  getProductosCategoria(categoria: string) : Observable<Producto[]>{
    //console.log("ruta categoria: " +this.URI+this.cat+categoria)
    return this.http.get<Producto[]>(`${this.URI}/${this.cat}/${categoria}`);
  }

}
