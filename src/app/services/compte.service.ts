import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Compte} from "../models/compte.model";

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
}
