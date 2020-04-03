import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './footer/footer.component';
import { ExplorarComponent } from './explorar/explorar.component';
import { LibrosComponent } from './libros/libros.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import {HttpClientModule} from '@angular/common/http';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormComponent } from './libros/form.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './libros/detalle/detalle.component';

const routes: Routes = [
  {path: '', redirectTo:'/inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'explorar', component: ExplorarComponent},
  {path: 'libros', component: LibrosComponent},
  {path: 'libros/page/:page', component: LibrosComponent},
  {path: 'notificaciones', component: NotificacionesComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'libros/form', component: FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    FooterComponent,
    ExplorarComponent,
    LibrosComponent,
    NotificacionesComponent,
    PerfilComponent,
    UsuariosComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
