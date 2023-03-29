import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Personnemorale} from "../../models/Personnemorale.model";
import {TierService} from "../../services/tier.service";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-tier-details',
  templateUrl: './tier-details.component.html',
  styleUrls: ['./tier-details.component.css']
})
export class TierDetailsComponent {
numClient!:string;
personnemorale!:Personnemorale;
  constructor(private route:ActivatedRoute,private router:Router,private tierService:TierService) {
    this.personnemorale=this.router.getCurrentNavigation()?.extras.state as Personnemorale;
  }
ngOnInit():void{
    this.numClient=this.route.snapshot.params['num'];

  }
}
