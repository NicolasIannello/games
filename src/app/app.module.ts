import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { BatallaNavalComponent } from './componentes/batalla-naval/batalla-naval.component';
import { TableroJugadorComponent } from './componentes/batalla-naval/tablero-jugador/tablero-jugador.component';
import { TableroOponenteComponent } from './componentes/batalla-naval/tablero-oponente/tablero-oponente.component';

@NgModule({
  declarations: [
    AppComponent,
    JuegosComponent,
    BatallaNavalComponent,
    TableroJugadorComponent,
    TableroOponenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
