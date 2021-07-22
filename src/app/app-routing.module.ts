import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartaComponent } from './components/carta/carta.component';
import { LoginComponent } from './components/login/login.component';
import { OrdenComponent } from './components/ordenes/orden/orden.component';
import { OrdenesComponent } from './components/ordenes/ordenes-list/ordenes.component';
import { ProductoDetalleComponent } from './components/productos/producto-detalle/producto-detalle.component';
import { ProductoFormComponent } from './components/productos/producto-form/producto-form.component';
import { ProductosComponent } from './components/productos/producto-list/productos.component';
import { UsuarioDetalleComponent } from './components/usuarios/usuario-detalle/usuario-detalle.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { UsuariosComponent } from './components/usuarios/usuario-list/usuarios.component';


const routes: Routes = [
  {path:'', component: CartaComponent},
  {path:'carta', component: CartaComponent},
  {path:'carta/mesa/:idmesa', component: CartaComponent},
  {path:'orden', component: OrdenComponent},
  {path:'ordenes', component: OrdenesComponent},
  {path:'productos', component: ProductosComponent},
  {path:'producto-form', component: ProductoFormComponent},
  {path:'producto-detalle/:id', component: ProductoDetalleComponent},
  {path:'usuarios', component: UsuariosComponent},
  {path:'usuario-form', component: UsuarioFormComponent},
  {path:'usuario-detalle/:id', component: UsuarioDetalleComponent},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
