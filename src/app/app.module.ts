import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompteComponent } from './components/compte/compte.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { KeycloakAngularModule } from 'keycloak-angular';
import { KeycloakService } from 'keycloak-angular';
import { config } from 'rxjs';

export function kcFactory(kcSecurity:KeycloakService){
  return ()=>{
      kcSecurity.init({
        config:{
          realm:"bank-front",
          clientId:"front-end",
          url:"http://localhost:8080/"
        },
        initOptions : {
          onLoad:"login-required",
          checkLoginIframe :true
        }
      }
      )

  }
}


@NgModule({
  declarations: [
    AppComponent,
    CompteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
  ],
  providers: [
    {provide:APP_INITIALIZER,deps:[KeycloakService],useFactory:kcFactory,multi:true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
