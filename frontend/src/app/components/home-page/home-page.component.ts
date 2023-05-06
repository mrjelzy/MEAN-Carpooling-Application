import { Component, OnInit } from '@angular/core';
import { Search } from 'src/app/interfaces/Search';
import { Trajet } from 'src/app/interfaces/Trajet';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { TrajetService } from 'src/app/services/trajet.service';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  trajets!: Trajet[];
  utilisateurs!: Utilisateur[];
  trajetAvecSonConducteur!: any[];

  constructor(private trajetService: TrajetService, private utilisateurService: UtilisateursService){
  }
  ngOnInit(){
    this.utilisateurService.getUtilisateurs().subscribe(
      (utilisateurs) => {
        this.utilisateurs = utilisateurs;
    });

  }

  onSearch(search: Search) {
   this.trajetService.getTrajetsAvecFiltre(search).subscribe(
      (trajets) => {
        this.trajets = trajets;
        console.log(trajets);
    });

   /*this.trajetService.getTrajets().subscribe(
      (trajets) => {
        this.trajets = trajets; 
    });*/

  }
}
