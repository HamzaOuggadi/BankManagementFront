import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Compte} from "../../models/compte.model";
import {CompteService} from "../../services/compte.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit{
  comptes! : Observable<Array<Compte>>;
  CompteByRibFormGroup! : FormGroup;
  CompteByNumClientFormGroup! : FormGroup;
  createCompteFormGroup! : FormGroup;
  errorMessage! : string;
  constructor(private compteService : CompteService,
              private fb : FormBuilder) {

  }

  ngOnInit(): void {

    this.CompteByRibFormGroup = this.fb.group({
      numRib : this.fb.control("")
    });

    this.CompteByNumClientFormGroup = this.fb.group({
      numClient : this.fb.control("")
    });

    this.createCompteFormGroup = this.fb.group({
      numClientCreate : this.fb.control(""),
      balance : this.fb.control(""),
      typeCompte : this.fb.control(""),
      devise : this.fb.control("")
    })

    this.comptes = this.compteService.getListComptes().pipe(
      catchError(err => {
      this.errorMessage = err.message();
      return throwError(err);
    }));
  }

  handleCompteByRib() {
    let numRib = this.CompteByRibFormGroup?.value.numRib;
    this.comptes = this.compteService.getCompteByRib(numRib).pipe(catchError(err => {
      this.errorMessage = err.message();
      return throwError(err);
    }));
  }

  handleCompteByNumClient() {
    let numClient = this.CompteByNumClientFormGroup?.value.numClient;
    this.comptes = this.compteService.getCompteByNumClient(numClient).pipe(catchError(err => {
      this.errorMessage = err.message();
      return throwError(err);
    }));
  }

  handleCreateCompte() {
    let compte = this.createCompteFormGroup?.value
    let idGestionnaire : number = 0;
    let numClient = this.createCompteFormGroup?.value.numClientCreate;
    // compte.typeCompte = this.createCompteFormGroup?.value.typeCompteCreate;
    // compte.balance = this.createCompteFormGroup?.value.balance;
    // compte.devise = this.createCompteFormGroup?.value.deviseCreate;
    this.compteService.createCompte(compte, numClient, idGestionnaire).subscribe({
      next : data => {
        alert("Compte Créer avec succès !");
      }, error : err => {
        console.log(err);
      }
    })
  }
}
