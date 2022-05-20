import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { BatallaNavalComponent } from './componentes/batalla-naval/batalla-naval.component';

@NgModule({
  declarations: [
    AppComponent,
    JuegosComponent,
    BatallaNavalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
