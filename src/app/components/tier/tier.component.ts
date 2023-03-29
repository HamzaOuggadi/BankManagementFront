import {Component, ElementRef, ViewChild} from '@angular/core';
import {TierService} from "../../services/tier.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Personnemorale} from "../../models/Personnemorale.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Personnephysique} from "../../models/Personnephysique.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tier',
  templateUrl: './tier.component.html',
  styleUrls: ['./tier.component.css']
})
export class TierComponent {

  personnemorale!:Observable<Array<Personnemorale>>;
  personnem!:Personnemorale
  personnephysique!:Observable<Array<Personnephysique>>;
  errorMessage!: string;


   @ViewChild('TypeSelect') operationTypeSelect!: ElementRef<HTMLSelectElement>;
  searchformGroup! : FormGroup ;
  createTierFormGroup!: FormGroup ;
  nbrPages:number=1;
  pages: Array<number>=[];
  currentPage:number=1;
  constructor(private tierService: TierService,private fb:FormBuilder, private  router:Router ) {
  }

  ngOnInit():void {



    this.tierService.nbrPersonne("PM").subscribe({
      next:data=>{
        this.nbrPages=Math.floor(data/10);
        this.pages=this.getPages();
        console.info(data);
        console.table(this.pages);
      },error:e=>{
        console.error(e);
      }
    })
    this.searchformGroup=this.fb.group({
      numClient:this.fb.control("")

    });
    this.createTierFormGroup = this.fb.group({
      adresse: this.fb.control(null,[Validators.minLength(4)]),
      numClient : this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      raionSociale: this.fb.control(null,[Validators.minLength(4)]),
      numRegisterComm: this.fb.control(null,[Validators.minLength(4)]),
      nationalite: this.fb.control(null),
      dateSouscription: this.fb.control(null),
      nomComplet: this.fb.control(null,[Validators.minLength(4)]),
      dateNaissance: this.fb.control(null,),
      typeIdentification: this.fb.control(""),
      numTel: this.fb.control("",[ Validators.pattern("[0-9]{10}$")]),
      email: this.fb.control("",[Validators.email])
    });
    this.personnemorale=this.tierService.getPersonnemorale(this.currentPage-1).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      }));
    this.personnephysique=this.tierService.getPersonnephysique(this.currentPage-1).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      }));

  }

  setTypeNationalite(nationalite: string): void {

    if (this.operationTypeSelect) {
      this.personnem.nationalite=nationalite;
      console.log(nationalite);
    }
    console.log(nationalite);
  }
  handleGetPersonnephysique(){
    this.personnephysique=this.tierService.getPersonnephysique(this.currentPage-1).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      }));
  }
  handleGetPersonnemorale(){
    this.personnemorale=this.tierService.getPersonnemorale(this.currentPage-1).pipe(

      catchError(err => {
        this.errorMessage=err.message;
        console.log(this.personnemorale);
        return throwError(err);
      }));
  }
  handleSearchPersonnemorale(){
    let num=this.searchformGroup?.value.numClient;
    this.personnemorale=this.tierService.searchPersonnemoralePagination(num,this.currentPage-1).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      }));
  }
  handleSearchPhysique(){
    let num=this.searchformGroup?.value.numClient;
    this.personnephysique=this.tierService.searchPersonnePhysique(num,this.currentPage-1).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      }));
  }

  getPages():Array<number>{
    let pages = [].constructor(this.nbrPages);
    if(pages.length>5){
      this.pages=[]
      this.pages.push(1)
      this.pages.push(2)
      //
      this.pages.push(3)
      this.pages.push(4)
      this.pages.push(5)
    }
    return this.pages;
  }
  goToPage(item: number) {
    this.currentPage=item;
    this.handleSearchPersonnemorale();
  }
  goToPage2(item: number) {
    this.currentPage=item;
    this.handleGetPersonnemorale();
  }
  goToPage3(item: number) {
    this.currentPage=item;
    this.handleGetPersonnephysique();
  }

  handleDeleteCustomer(personnemorale : Personnemorale){
    console.log(personnemorale);
  let conf = confirm("Are you sure ?");
  if (!conf)
  return;
    console.log(this.tierService);
  this.tierService.deletPersonneMorale(personnemorale.idClient).subscribe({
    next :(resp )=> {

      console.log(personnemorale.idClient);
  this.personnemorale = this.personnemorale.pipe(
    map(data=> {
      let index = data.indexOf(personnemorale);
      data.slice(index,1);
      return data;
    })
  )},
error : err => console.log(err)

});
}
  handleCreatePersommeMorale(){
  let persommemorale = this.createTierFormGroup?.value
  this.tierService.createPersonneMorale(persommemorale).subscribe({
    next : data => {
     alert("Client Créer avec succès !");
     this.createTierFormGroup.reset();
     }, error : err => {
    console.log(err);
    }
    });
  console.log(persommemorale);
}
  handleCreatePersommePhysique(){
    let persommephysique = this.createTierFormGroup?.value
    this.tierService.createPersonnePhysique(persommephysique).subscribe({
      next : data => {
        alert("Client Créer avec succès !");
        this.createTierFormGroup.reset();
      }, error : err => {
        console.log(err);
      }
    });
  }

  handleDetails(p: Personnemorale) {
this.router.navigateByUrl("tier-details/"+p.numClient,{state: p});
  }
}



