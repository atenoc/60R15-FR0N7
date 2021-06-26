import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/Producto';
import { OrdenService } from 'src/app/services/orden.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

  /** todos los productos  */
  productos: Producto[] = []; 
  productosFiltro: Producto[] = []; 
  

  /** por categoria */
  snacks: Producto[] = [];  
  tacos: Producto[] = [];
  tortas: Producto[] = [];
  bebidas: Producto[] = [];
  jugos: Producto[] = [];
  refrescos: Producto[] = [];

  mostrarSnacks: boolean = false;
  mostrarTacos: boolean = false;
  mostrarTortas: boolean = false;
  mostrarBebidas: boolean = false;
  mostrarJugos: boolean = false;
  mostrarRefrescos: boolean = false;
  mostrarProductosFiltrados: boolean = false;

  idmesa: number;

  constructor(private productoService: ProductoService, private ordenService: OrdenService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    console.log("Obteniendo todos productos...")
    this.productoService.getProductos()
    .subscribe(
      res => {
        console.log("res productos: "+res)
        this.productos = res;

        /** snacks */
        this.snacks = this.productos.filter(p => p.categoria === "SNACKS");
        if(this.snacks.length > 0){
          this.mostrarSnacks = true
        }

        /** tacos */
        this.tacos = this.productos.filter(p => p.categoria === "TACOS");
        if(this.tacos.length > 0){
          this.mostrarTacos = true
        }

        /** tortas */
        this.tortas = this.productos.filter(p => p.categoria === "TORTAS");
        if(this.tortas.length > 0){
          this.mostrarTortas = true
        }

        /** bebidas */
        this.bebidas = this.productos.filter(p => p.categoria === "BEBIDAS");
        if(this.bebidas.length > 0){
          this.mostrarBebidas = true
        }

        /** jugos */
        this.jugos = this.productos.filter(p => p.categoria === "JUGOS");
        if(this.jugos.length > 0){
          this.mostrarJugos = true
        }

        /** refrescos */
        this.refrescos = this.productos.filter(p => p.categoria === "REFRESCOS");
        if(this.refrescos.length > 0){
          this.mostrarRefrescos = true
        }

        this.activatedRoute.params.subscribe(params => {
          //this.idmesa = params['idmesa'];
          this.ordenService.orden.noMesa = params['idmesa'];
          console.log("ID MESA: "+ this.ordenService.orden.noMesa)
        })

      },
      err => console.log(err)
    )
  }

  /** Orden */

  agregarProducto(producto: Producto){
    this.ordenService.orden.nombreCliente="Car"
    this.ordenService.orden.noOrden=0
    //this.ordenService.orden.noMesa=this.idmesa
    this.ordenService.orden.agregarProducto(producto)
    this.ordenService.guardarLocalStorage() 
  }

  buscarProductos(nombreProducto:string){

    if(nombreProducto.length > 0){
      this.mostrarProductosFiltrados = true
    }else{
      this.mostrarProductosFiltrados = false
    }
   
    console.log("nombre Buscar: "+ nombreProducto)
    this.productosFiltro =  this.productos.filter(x=>{
      console.log("return: " +x.nombre.toLocaleLowerCase().includes(nombreProducto.toLocaleLowerCase()))
      return x.nombre.toLocaleLowerCase().includes(nombreProducto.toLocaleLowerCase())
    })
  }

}
