import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Personnemorale} from "../models/Personnemorale.model";
import {Personnephysique} from "../models/Personnephysique.model";
import {Compte} from "../models/compte.model";

@Injectable({
  providedIn: 'root'
})
export class TierService {

  constructor(private http:HttpClient) {

  }
  public getPersonnemorale(page:number=0,size:number=10):Observable<Array<Personnemorale>>{
    return this.http.get<Array<Personnemorale>>("http://localhost:8086/tiers/listPersonneMorale"+"?page="+page+"&size="+size)
  }
  searchPersonnemorale(numClient: string): Observable<Personnemorale[]> {
    return this.http.get<Personnemorale[]>('http://localhost:8086/tiers/searchPersonneMorale/'+numClient);

  }
  searchPersonnemoralePagination(numClient: string,page:number=1,size:number=10): Observable<Personnemorale[]> {
    return this.http.get<Personnemorale[]>("http://localhost:8086/tiers/searchPersonneMoralePagination/"+numClient+"?page="+page+"&size="+size);
  }
  nbrPersonne(type: string): Observable<number> {
    return this.http.get<number>('http://localhost:8086/tiers/nombrpersonne/'+type);

  }

  //
  public getPersonnephysique(page:number=1,size:number=5):Observable<Array<Personnephysique>>{
    return this.http.get<Array<Personnephysique>>("http://localhost:8086/tiers/listPersonnePhysique"+"?page="+page+"&size="+size)
  }
  searchPersonnePhysique(numClient: string,page:number=1,size:number=10): Observable<Personnephysique[]> {
    return this.http.get<Personnephysique[]>("http://localhost:8086/tiers/searchPersonnePhysique/"+numClient+"?page="+page+"&size="+size);

  }
  searchPersonnephysiquePagination(numClient: string,page:number=1,size:number=10): Observable<Personnemorale[]> {
    return this.http.get<Personnemorale[]>("http://localhost:8086/tiers/searchPersonnePhysiquePagination/"+numClient+"?page="+page+"&size="+size);
  }
  deletPersonneMorale(id: number=0){
return this.http.delete("http://localhost:8086/tiers/PersonneMoraledelete/"+id);
  }
  public createPersonneMorale(personnemorale : Personnemorale) : Observable<Personnemorale>{
    return this.http.post<Personnemorale>("http://localhost:8086/tiers/savePersonneMorale", personnemorale);

  }
  public createPersonnePhysique(personnephysique : Personnephysique) : Observable<Personnemorale>{
    return this.http.post<Personnemorale>("http://localhost:8086/tiers/savePersonnePhysique", personnephysique);

  }



}
