import { Component, Input, OnInit } from '@angular/core';
import { Trajet } from 'src/app/interfaces/Trajet';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { AuthService } from 'src/app/services/auth.service';
import { TrajetService } from 'src/app/services/trajet.service';
import { Types } from 'mongoose';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

type TrajetAvecConducteur = { trajet: Trajet, conducteur: Utilisateur | undefined };

@Component({
  selector: 'app-trajets-page',
  templateUrl: './trajets-page.component.html',
  styleUrls: ['./trajets-page.component.css']
})
export class TrajetsPageComponent implements OnInit {
  utilisateur !: Utilisateur | null;
  utilisateurs !: Utilisateur[];

  tousMesTrajetsC : TrajetAvecConducteur[] = [];
  mesTrajetsEnCoursC : TrajetAvecConducteur[] = [];
  mesTrajetsFinisC : TrajetAvecConducteur[] = [];

  tousMesTrajetsP : Trajet[] = []
  tousMesTrajetsPAvecConducteur : TrajetAvecConducteur[] = [];
  mesTrajetsEnCoursP : TrajetAvecConducteur[] = [];
  mesTrajetsFinisP : TrajetAvecConducteur[]= [];

  constructor(private authService : AuthService, 
    private trajetService : TrajetService, private utilisateurService: UtilisateursService){
  }

  ngOnInit(): void {
    this.utilisateur = this.authService.getUtilisateur();

    this.trajetService.getMyTrajets().subscribe(
      (trajets) => {
        if(trajets.length > 0){
          this.tousMesTrajetsC = trajets.map(trajet => {
            const conducteur = this.utilisateur ? this.utilisateur : undefined;
            return { trajet, conducteur };
           }).filter(({ conducteur }) => conducteur !== undefined);

          this.mesTrajetsEnCoursC = this.tousMesTrajetsC.filter( trajet => trajet.trajet.heureArrive === null);
          this.mesTrajetsFinisC = this.tousMesTrajetsC.filter( trajet => trajet.trajet.heureArrive !== null);
      
        }
        
        });

      this.trajetService.getMyTrajetsPassager().subscribe(
        (trajets) => this.tousMesTrajetsP = trajets );



      this.utilisateurService.getUtilisateurs().subscribe(
        (utilisateurs) => {
          if(this.tousMesTrajetsP.length > 0){
            this.tousMesTrajetsPAvecConducteur = this.tousMesTrajetsP
            .map(trajet => {
            const conducteur = utilisateurs.find(utilisateur => utilisateur.email === trajet.email);
            return { trajet, conducteur };
          })
          .filter(({ conducteur }) => conducteur !== undefined);

          this.mesTrajetsEnCoursP = this.tousMesTrajetsPAvecConducteur.filter( trajet => trajet.trajet.heureArrive === null);
          this.mesTrajetsFinisP = this.tousMesTrajetsPAvecConducteur.filter( trajet => trajet.trajet.heureArrive !== null);
        
          }
}
      )

      console.log(this.tousMesTrajetsP);
  }

  terminerTrajet(trajet: Trajet){
    console.log(trajet._id);
  }


}
