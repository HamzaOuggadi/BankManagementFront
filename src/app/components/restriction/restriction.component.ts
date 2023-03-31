import {Component, OnInit} from '@angular/core';
import {Gestionnaire} from "../../models/gestionnaire.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
import {Compte} from "../../models/compte.model";
import {GestionnaireService} from "../../services/gestionnaire.service";
import {CompteService} from "../../services/compte.service";
import {Restriction} from "../../models/restriction.model";
import {RestrictionService} from "../../services/restriction.service";

@Component({
  selector: 'app-restriction',
  templateUrl: './restriction.component.html',
  styleUrls: ['./restriction.component.css']
})
export class RestrictionComponent implements OnInit{

  restriction?:Restriction;
  idRestriction!:number;
  idClient!:number;
  creatRestrictionForm! : FormGroup;
  errorMessage! : string;
  restrictions! : Observable<Array<Restriction>>;


  ngOnInit(): void {
    this.creatRestrictionForm = this.fb.group({
      etat : this.fb.control(""),
      idClient : this.fb.control("")

    })
    this.restrictions = this.restrictionService.getListRestriction().pipe(
      catchError(err => {
        this.errorMessage = err.message();
        return throwError(err);
      }));
  }
  constructor(private restrictionService:RestrictionService , private fb: FormBuilder){
  }
  OnChercheRest(){
    this.restrictionService.getRestrictionById(this.idRestriction).subscribe((data)=> this.restriction=data);
  }
  DeleteRest(){
    this.restrictionService.deleteRestriction(this.idRestriction);
    this.ngOnInit();
  }
  createRest(){
    let restriction = this.creatRestrictionForm?.value
    let idClient : number = this.creatRestrictionForm?.value.idClient;
    this.restrictionService.createRestriction(restriction , idClient).subscribe({
      next : data => {
        alert("Restriction Créer avec succès !");
      }
    })}


}
