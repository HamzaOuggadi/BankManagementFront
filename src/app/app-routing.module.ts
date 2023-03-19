import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompteComponent} from "./components/compte/compte.component";
import {GestionnaireComponent} from "./components/gestionnaire/gestionnaire.component";

const routes: Routes = [
  {path : "compte", component : CompteComponent},
  {path:"gestionnaire",component: GestionnaireComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
