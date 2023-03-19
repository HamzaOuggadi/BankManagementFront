import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gestionnaire } from '../models/gestionnaire.model';
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class GestionnaireService {

  constructor(private http: HttpClient) {
  }

  getGestionnaireById(idGestionnaire: number): Observable<Gestionnaire> {
    return this.http.get<Gestionnaire>(environment.API_URL_Gestionnaire+"/get/"+ idGestionnaire);
  }

  deleteGestionnaire(idGestionnaire:number){
    this.http.delete(environment.API_URL_Gestionnaire+"/deletebyId/"+idGestionnaire).subscribe();
    alert("Gestionn id "+idGestionnaire)
  }
  createGestionnaire(gestionnaire:Gestionnaire):Observable<Gestionnaire>{
    return this.http.post<Gestionnaire>(environment.API_URL_Gestionnaire+"/create", gestionnaire);
  }

}
