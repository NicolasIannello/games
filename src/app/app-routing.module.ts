import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { BatallaNavalComponent } from './componentes/batalla-naval/batalla-naval.component';

const routes: Routes = [
  {path: '', component:JuegosComponent},
  {path: 'BatallaNaval', component:BatallaNavalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
