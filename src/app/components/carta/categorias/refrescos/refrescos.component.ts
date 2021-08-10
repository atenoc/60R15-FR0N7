import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Producto } from 'src/app/models/Producto';
import { OrdenService } from 'src/app/services/orden.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refrescos',
  templateUrl: './refrescos.component.html',
  styleUrls: ['./refrescos.component.css']
})
export class RefrescosComponent implements OnInit {

  productos: Producto[] = [];
  productosFiltro: Producto[] = []; 
  mostrarProductos: boolean = false;
  mostrarProductosFiltrados: boolean = false;
  user:firebase.User;

  constructor(private afAuth: AngularFireAuth, private productoService: ProductoService, private ordenService: OrdenService) { }

  ngOnInit() {

    this.afAuth.user.subscribe((usuario)=>{
      if(usuario){
        this.user = usuario
      }
      else{
        console.log("¡Sin sesión!")
      }
    })

    //console.log("Obteniendo productos...")
    this.productoService.getProductos()
    .subscribe(
      res => {
        this.productos = res.filter(p => p.categoria === "REFRESCOS"); // <<-- FILTRADO POR CATEGORIA
        console.log("Productos: "+ this.productos.length)
        if(this.productos.length > 0){
          this.mostrarProductos = true
        }

      },
      err => console.log(err)
    )
  }

  agregarProducto(producto: Producto){
    //this.ordenService.orden.nombreCliente=""
    //this.ordenService.orden.noOrden=0
    //this.ordenService.orden.noMesa=this.idmesa
    this.ordenService.orden.agregarProducto(producto)
    this.ordenService.guardarLocalStorage()
    this.mostrarAlerta() 
  }

  buscarProductos(nombreProducto:string){

    if(nombreProducto.length > 0){
      this.mostrarProductosFiltrados = true
    }else{
      this.mostrarProductosFiltrados = false
    }
   
    //console.log("nombre Buscar: "+ nombreProducto)
    this.productosFiltro =  this.productos.filter(x=>{         //this.tortas
      //console.log("return: " +x.nombre.toLocaleLowerCase().includes(nombreProducto.toLocaleLowerCase()))
      return x.nombre.toLocaleLowerCase().includes(nombreProducto.toLocaleLowerCase())
    })
  }

  mostrarAlerta(){
    Swal.fire({
      position: 'top-end',
      //icon: 'success',
      title: '<h6 style="color: orange; margin-bottom: -5px;"> Producto agregado </h6>',
      showConfirmButton: false,
      timer: 500
    })
  }

}
