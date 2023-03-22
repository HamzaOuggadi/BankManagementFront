import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Compte} from "../models/compte.model";
import {Gestionnaire} from "../models/gestionnaire.model";

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private http : HttpClient) {

  }

  public getListComptes() : Observable<Array<Compte>> {
    return this.http.get<Array<Compte>>("http://localhost:8086/comptes");
  }

  public getCompteByRib(numRib : number) : Observable<Array<Compte>> {
    return this.http.get<Array<Compte>>("http://localhost:8086/comptes/"+numRib);
  }


  public getCompteByNumClient(numClient : string) : Observable<Array<Compte>> {
    return this.http.get<Array<Compte>>("http://localhost:8086/comptes?numClient=" + numClient);
  }


  public getCompteByGestionnaire(idGestionnaire : number) : Observable<Array<Compte>> {
    return this.http.get<Array<Compte>>("http://localhost:8086/comptes/compteByGestionnaire/" +idGestionnaire);
  }

  public getListGestionnaire() : Observable<Array<Gestionnaire>> {
    return this.http.get<Array<Gestionnaire>>("http://localhost:8086/gestionnaire/list");
  }

  public createCompte(compte : Compte, numClient : string, idGestionnaire : number) : Observable<Compte>{
    return this.http.post<Compte>("http://localhost:8086/comptes/create?numClient=" + numClient + "&idGestionnaire=" + idGestionnaire, compte);
  }

  public deleteCompte(ribCompte : String) {
    return this.http.delete("http://localhost:8086/comptes/deleteByRib/" + ribCompte);
  }
}
