import {Component, OnInit} from '@angular/core';
import { Gestionnaire } from 'src/app/models/gestionnaire.model';
import { GestionnaireService } from 'src/app/services/gestionnaire.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Compte} from "../../models/compte.model";
import {catchError, Observable, throwError} from "rxjs";
import {CompteService} from "../../services/compte.service";

@Component({
  selector: 'app-gestionnaire',
  templateUrl: './gestionnaire.component.html',
  styleUrls: ['./gestionnaire.component.css']
})
export class GestionnaireComponent implements OnInit{
  gestionnaires?:Gestionnaire;
  idGestionnaire!:number;
  creatGestionnaireForm! : FormGroup;
  errorMessage! : string;
  comptes! : Observable<Array<Compte>>;


  ngOnInit(): void {
    this.creatGestionnaireForm = this.fb.group({
      numGestionnaire : this.fb.control(""),
      nom : this.fb.control("")
    })

  }
  constructor(private gestionnerService:GestionnaireService , private fb: FormBuilder, private compteService : CompteService,){
  }

  OnCherche(){
    this.gestionnerService.getGestionnaireById(this.idGestionnaire).subscribe((data)=> this.gestionnaires=data);
    this.comptes = this.compteService.getCompteByGestionnaire(this.idGestionnaire).pipe(
      catchError(err => {
        this.errorMessage = err.message();
        return throwError(err);
      }));
  }
  Delete(){
    this.gestionnerService.deleteGestionnaire(this.idGestionnaire);
    this.ngOnInit();
  }
  createGes(){
    let gestionnaire = this.creatGestionnaireForm?.value
    this.gestionnerService.createGestionnaire(gestionnaire).subscribe({
      next : data => {
        alert("Gestionnaire Créer avec succès !");
      }
  })}


}
