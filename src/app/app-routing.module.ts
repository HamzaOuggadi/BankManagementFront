import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompteComponent} from "./components/compte/compte.component";
import {TierComponent} from "./components/tier/tier.component";
import {TierDetailsComponent} from "./components/tier-details/tier-details.component";

const routes: Routes = [
  {path : "compte", component : CompteComponent},
  {path: "tier",component: TierComponent},
  {path: "tier-details/:numClient",component: TierDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
