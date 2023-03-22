import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompteComponent } from './components/compte/compte.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GestionnaireComponent } from './components/gestionnaire/gestionnaire.component';
import { RestrictionComponent } from './components/restriction/restriction.component';

@NgModule({
  declarations: [
    AppComponent,
    CompteComponent,
    GestionnaireComponent,
    RestrictionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
