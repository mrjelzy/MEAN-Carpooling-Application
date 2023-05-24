import { Component, Input, OnInit } from '@angular/core';
import { IntegerType } from 'mongodb';
import { Router } from '@angular/router';
import { Resultat } from 'src/app/interfaces/Resultat';
import { Trajet } from 'src/app/interfaces/Trajet';
import { AuthService } from 'src/app/services/auth.service';

import { TrajetService } from 'src/app/services/trajet.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-proposer-page',
  templateUrl: './proposer-page.component.html',
  styleUrls: ['./proposer-page.component.css']
})

export class ProposerPageComponent implements OnInit{

  villeDep !: string | null;
  villeArr !: string;
  date !: string;
  email !: string | undefined;
  nbPlaces !: number;
  prix !: number;
  hDep !: string;
  
  trajet !: Trajet;

  constructor(private authService : AuthService, private trajetService: TrajetService, private router: Router){}

  ngOnInit(): void {
    this.email = this.authService.getUtilisateur()?.email;
  }

  onSubmit(){
    if (!this.villeDep || !this.villeArr || !this.date || !this.nbPlaces || !this.prix || !this.hDep) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    else{
      if(this.email){
        const date = new Date(this.date);
    
        const year = date.getFullYear().toString().substr(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);

        const formattedDate = year + month + day;
        
        const trajet: Trajet = {
          villeDepart: this.villeDep,
          villeArrive: this.villeArr,
          date: formattedDate,
          email: this.email,
          nbPlaces: this.nbPlaces,
          passagers: [],
          prix: this.prix,
          heureDepart: this.hDep,
          heureArrive: ''
        }
      

      this.trajetService.addTrajet(trajet).subscribe(
        (resultat : Resultat) => {
          if(resultat.resultat === 0){
            alert(resultat.message);
          }else{
            this.router.navigate(['trajets'], {queryParams: {welcome: true}});
          }
        });
      }
    }
  }
}