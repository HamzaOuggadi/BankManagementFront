import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompteComponent} from "./components/compte/compte.component";
import { AuthGuard } from './guard/auth-guard.guard';

const routes: Routes = [
  {path : "compte", component : CompteComponent,canActivate:[AuthGuard],data:{roles :['USER']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
