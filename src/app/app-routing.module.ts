import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompteComponent} from "./components/compte/compte.component";
import {GestionnaireComponent} from "./components/gestionnaire/gestionnaire.component";
import {RestrictionComponent} from "./components/restriction/restriction.component";

const routes: Routes = [
  {path : "compte", component : CompteComponent},
  {path:"gestionnaire",component: GestionnaireComponent},
  {path:"restriction",component: RestrictionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
