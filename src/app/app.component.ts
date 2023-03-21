import { Component, OnInit } from '@angular/core';
import { SecurityService} from './services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
 title = 'BankManagementFront';
 constructor(public securityService:SecurityService) { }

 public async ngOnInit() {

 }

 onLogout() {
   this.securityService.kcService.logout(window.location.origin);
 }
 public async getToken() {
 }

 async login(){
   await this.securityService.kcService.login({
     redirectUri : window.location.origin
   })
 }

export class AppComponent {
  title = 'BankManagementFront';

}
