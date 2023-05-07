import { Component, Input, OnInit } from '@angular/core';
import { Trajet } from 'src/app/interfaces/Trajet';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { AuthService } from 'src/app/services/auth.service';
import { TrajetService } from 'src/app/services/trajet.service';

type TrajetAvecConducteur = { trajet: Trajet, conducteur: Utilisateur | undefined };

@Component({
  selector: 'app-trajets-page',
  templateUrl: './trajets-page.component.html',
  styleUrls: ['./trajets-page.component.css']
})
export class TrajetsPageComponent implements OnInit {
  utilisateur !: Utilisateur | null;
  trajetsAvecConducteurs!: TrajetAvecConducteur[];

  constructor(private authService : AuthService, private trajetService : TrajetService){
  }

  ngOnInit(): void {
    this.utilisateur = this.authService.getUtilisateur();
    this.trajetService.getMyTrajets().subscribe(
      (trajets) => {
        this.trajetsAvecConducteurs = trajets.map(trajet => {
            const conducteur = this.utilisateur ? this.utilisateur : undefined;
            return { trajet, conducteur };
        }).filter(({ conducteur }) => conducteur !== undefined);
      });
  }

  terminerTrajet(){
    console.log('je termine un trajet');
  }


}
