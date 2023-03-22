import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Compte} from "../../models/compte.model";
import {CompteService} from "../../services/compte.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $: any;

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
  idGestionnaire!:number;
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
      numClientCreate : this.fb.control("", [Validators.required]),
      balance : this.fb.control("",[Validators.required, Validators.min(100)]),
      typeCompte : this.fb.control("", [Validators.required]),
      devise : this.fb.control("", [Validators.required])
    })

    this.comptes = this.compteService.getListComptes().pipe(
      catchError(err => {
      this.errorMessage = err.message();
      return throwError(err);
    }));

    this.comptes = this.compteService.getCompteByGestionnaire(this.idGestionnaire).pipe(
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
    console.log(compte);
    let idGestionnaire : number = 0;
    let numClient = this.createCompteFormGroup?.value.numClientCreate;
    this.compteService.createCompte(compte, numClient, idGestionnaire).subscribe({
      next : data => {
        alert("Compte Créer avec succès !");
      }, error : err => {
        console.log(err);
      }
    })
  }

  handleDeleteCompte(c: Compte) {
    let rib = parseInt(c.ribAsString)
    if (confirm("Vous êtes sûr de vouloir supprimer ce compte ?")) {
      this.compteService.deleteCompte(rib).subscribe({
        next : data => {

          this.handleCompteByRib();
        }, error : err => {
          console.log(err);
        }
      });
    }
  }
}
