import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  id: string;
  producto: Producto;
  precioN : Number;
  disponibleN : boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router) { }

  ngOnInit() {
    console.log("Detalle producto...")
    
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
      this.productoService.getProducto(this.id)   //volver a llamar los datos con el id recibido
        .subscribe(
          res => {
            this.producto = res;
            console.log(res)
          },
          err => console.log(err)
        )
    });
  }

  deleteProducto(id: string) {
    this.productoService.deleteProducto(id)
      .subscribe(res => {
        console.log(res)
        this.router.navigate(['/productos']);
      })
  }

  updateProducto(nombre: HTMLInputElement, descripcion: HTMLInputElement, 
    categoria: HTMLInputElement, precio: HTMLInputElement, disponible: HTMLInputElement): boolean {

    //console.log("datos: "+this.producto._id, nombre.value, descripcion.value, telefono.value, direccion.value)
    this.precioN = Number(precio.value)
    this.disponibleN = true;

    this.productoService.updateProducto(this.producto._id, nombre.value, descripcion.value, categoria.value, this.precioN, this.disponibleN)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/productos']);
      });
    return false;
  }

}
