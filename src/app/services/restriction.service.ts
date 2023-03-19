import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restriction } from "../models/restriction.model";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class RestrictionService {

  constructor(private http: HttpClient) {
  }

  getRestrictionById(idRestriction: number): Observable<Restriction> {
    return this.http.get<Restriction>(environment.API_URL_Restriction+"/get/"+ idRestriction);
  }

  deleteRestriction(idRestriction:number){
    this.http.delete(environment.API_URL_Restriction+"/deletebyId/"+idRestriction).subscribe();
    alert("Gestionn id "+idRestriction)
  }
  createRestriction(restriction:Restriction):Observable<Restriction>{
    return this.http.post<Restriction>(environment.API_URL_Restriction+"/create", restriction);
  }

}
