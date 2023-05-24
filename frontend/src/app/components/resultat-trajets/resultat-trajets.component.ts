import { Component, Input, OnInit } from '@angular/core';
import { Trajet } from 'src/app/interfaces/Trajet';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { AuthService } from 'src/app/services/auth.service';
import { TrajetService } from 'src/app/services/trajet.service';

type TrajetAvecConducteur = { trajet: Trajet, conducteur: Utilisateur | undefined };
@Component({
  selector: 'app-resultat-trajets',
  templateUrl: './resultat-trajets.component.html',
  styleUrls: ['./resultat-trajets.component.css']
})
export class ResultatTrajetsComponent implements OnInit {
  utilisateur !: Utilisateur | null;
  @Input() trajets!: Trajet[];
  @Input() utilisateurs!: Utilisateur [];
  @Input() trajetsAvecConducteurs!: TrajetAvecConducteur[];

  constructor(private authService : AuthService, private trajetService : TrajetService){}

  ngOnInit(): void {
    this.utilisateur = this.authService.getUtilisateur();

    this.trajetsAvecConducteurs = this.trajets
        .map(trajet => {
          const conducteur = this.utilisateurs.find(utilisateur => utilisateur.email === trajet.email);
          return { trajet, conducteur };
        })
        .filter(({ conducteur }) => conducteur !== undefined);
  }

  reserverTrajet(trajet: TrajetAvecConducteur){
    if(this.utilisateur !== null){
      if(trajet.trajet._id){
        this.trajetService.patchReservation(trajet.trajet._id).subscribe( (result) => {
          console.log(result.message);
        })
      }
    }
  }

}
