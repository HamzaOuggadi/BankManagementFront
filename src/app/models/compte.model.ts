import {Gestionnaire} from "./gestionnaire.model";

export interface Compte {
  ribCompte : number;
  ribAsString : string;
  typeCompte : string;
  balance : number;
  dateCreation : Date;
  devise : string;
  sitex : string;
  idGestionnaire : number;
}
