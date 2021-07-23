import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuario-list/usuarios.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { UsuarioDetalleComponent } from './components/usuarios/usuario-detalle/usuario-detalle.component';
import { ProductosComponent } from './components/productos/producto-list/productos.component';
import { ProductoFormComponent } from './components/productos/producto-form/producto-form.component';
import { ProductoDetalleComponent } from './components/productos/producto-detalle/producto-detalle.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartaComponent } from './components/carta/carta.component';
import { OrdenComponent } from './components/ordenes/orden/orden.component';
import { OrdenesComponent } from './components/ordenes/ordenes-list/ordenes.component';
import { OrdenesListBarraComponent } from './components/ordenes/ordenes-list-barra/ordenes-list-barra.component';
import { OrdenesListCocinaComponent } from './components/ordenes/ordenes-list-cocina/ordenes-list-cocina.component';
import { OrdenesListCajaComponent } from './components/ordenes/ordenes-list-caja/ordenes-list-caja.component';
import { OrdenesListMeseroComponent } from './components/ordenes/ordenes-list-mesero/ordenes-list-mesero.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    UsuarioFormComponent,
    UsuarioDetalleComponent,
    ProductosComponent,
    ProductoFormComponent,
    ProductoDetalleComponent,
    NavigationComponent,
    LoginComponent,
    CartaComponent,
    OrdenComponent,
    OrdenesComponent,
    OrdenesListBarraComponent,
    OrdenesListCocinaComponent,
    OrdenesListCajaComponent,
    OrdenesListMeseroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,        
    FormsModule,
    NgxSpinnerModule,          //spinner
    BrowserAnimationsModule,    //para las animaciones
    AngularFireModule.initializeApp(environment.firebase)  // firebase
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
