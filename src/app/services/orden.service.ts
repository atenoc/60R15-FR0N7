import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleOrden } from '../models/DetalleOrden';
import { Orden } from '../models/Orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  URI = 'http://localhost:4000/api/ordenes';

  orden:Orden = new Orden()

  constructor(private http: HttpClient) { 
    this.orden = this.ultimaOrden
  }

  guardarLocalStorage(){
    localStorage.setItem("ultimaOrden", JSON.stringify(this.orden))
    //console.log("Se guardó ultimaOrden en local storage: "+localStorage.getItem("ultimaOrden")) 
    console.log("orden en local storage")
  }

  get ultimaOrden(): Orden{
    let ordenLocalStorage: Orden = new Orden(JSON.parse(localStorage.getItem("ultimaOrden")));
    if(ordenLocalStorage == null){
      return new Orden()
    }
    return ordenLocalStorage;
  }

  guardarOrdenLocalStorage(){
    let listadoOrdenes: Orden[] = new Array<Orden>()
    listadoOrdenes = this.listadoOrdenesLocalStorage;
    this.orden.noOrden = listadoOrdenes.length + 1
    listadoOrdenes.push(this.orden);
    localStorage.setItem("ordenes", JSON.stringify(listadoOrdenes))
    localStorage.removeItem("ultimaOrden")
    this.orden = new Orden(null) //limpiamos el objeto
    console.log("Se guardó orden")
  }

  get listadoOrdenesLocalStorage(): Orden[]{
    let ordenes: Orden[] =  JSON.parse(localStorage.getItem("ordenes"))
    if(ordenes ==null){
      return new Array<Orden>()
    }
    return ordenes
    //return ordenes.sort((a,b)=> b.noOrden - a.noOrden)  //ordenar al reves
  }



  /** Rest Apis */

  createOrden(noMesa: number, nombreCliente: string, en_cocina:string, en_barra:string, creado_por:string, detalleOrden:Array<DetalleOrden>){
    return this.http.post(`${this.URI}`, {noMesa,nombreCliente, en_cocina, en_barra, creado_por, detalleOrden });  
  }

  getOrdenes() {
    return this.http.get<Orden[]>(this.URI);
  }

  getOrden(id: string) {
    return this.http.get<Orden>(`${this.URI}/${id}`);
  }

  deleteOrden(id: string) {
    return this.http.delete(`${this.URI}/${id}`);
  }
  /* old
  updateOrden(id: string, estatus: string, en_cocina: string, en_barra: string, detalleOrden: Array<DetalleOrden>) {
    return this.http.put(`${this.URI}/${id}`, {estatus, en_cocina, en_barra, detalleOrden});
  }*/

  updateOrden(id: string, estatus: string, en_cocina: string, en_barra: string) {
    return this.http.put(`${this.URI}/${id}`, {estatus, en_cocina, en_barra});
  }

}
