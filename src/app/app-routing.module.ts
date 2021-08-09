import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartaComponent } from './components/carta/carta.component';
import { BebidasComponent } from './components/carta/categorias/bebidas/bebidas.component';
import { JugosComponent } from './components/carta/categorias/jugos/jugos.component';
import { RefrescosComponent } from './components/carta/categorias/refrescos/refrescos.component';
import { SnacksComponent } from './components/carta/categorias/snacks/snacks.component';
import { TacosComponent } from './components/carta/categorias/tacos/tacos.component';
import { TortasComponent } from './components/carta/categorias/tortas/tortas.component';
import { LoginComponent } from './components/login/login.component';
import { OrdenComponent } from './components/ordenes/orden/orden.component';
import { OrdenesListBarraComponent } from './components/ordenes/ordenes-list-barra/ordenes-list-barra.component';
import { OrdenesListCajaComponent } from './components/ordenes/ordenes-list-caja/ordenes-list-caja.component';
import { OrdenesListCocinaComponent } from './components/ordenes/ordenes-list-cocina/ordenes-list-cocina.component';
import { OrdenesListMeseroComponent } from './components/ordenes/ordenes-list-mesero/ordenes-list-mesero.component';
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
  //{path:'carta/mesa/:idmesa', component: CartaComponent},
  {path:'tortas', component: TortasComponent},
  {path:'tacos', component: TacosComponent},
  {path:'snacks', component: SnacksComponent},
  {path:'bebidas', component: BebidasComponent},
  {path:'jugos', component: JugosComponent},
  {path:'refrescos', component: RefrescosComponent},
  {path:'orden', component: OrdenComponent},
  {path:'ordenes', component: OrdenesComponent},
  {path:'ordenes-barra', component: OrdenesListBarraComponent},
  {path:'ordenes-cocina', component: OrdenesListCocinaComponent},
  {path:'ordenes-caja', component: OrdenesListCajaComponent},
  {path:'ordenes-mesero', component: OrdenesListMeseroComponent},
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
