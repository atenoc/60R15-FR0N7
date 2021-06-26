import { Component, OnInit } from '@angular/core';
import { Orden } from 'src/app/models/Orden';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  listadoOrdenes:Orden[] =  new Array<Orden>()

  constructor(public ordenService: OrdenService) { }

  ngOnInit() {

    //this.listadoOrdenes = this.ordenesLocalStorage

    this.ordenService.getOrdenes()
    .subscribe(
      res => {
        this.listadoOrdenes = res;
      },
      err => console.log(err)
    )

  }

  get ordenesLocalStorage(): Orden[]{
    let ordenes: Orden[] =  JSON.parse(localStorage.getItem("ordenes"))
    if(ordenes ==  null){
      return new Array<Orden>();
    }
    return ordenes
  }

}
