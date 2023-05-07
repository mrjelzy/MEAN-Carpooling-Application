import { Component, Input, OnInit } from '@angular/core';
import { Trajet } from 'src/app/interfaces/Trajet';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { TrajetService } from 'src/app/services/trajet.service';

type TrajetAvecConducteur = { trajet: Trajet, conducteur: Utilisateur | undefined };
@Component({
  selector: 'app-resultat-trajets',
  templateUrl: './resultat-trajets.component.html',
  styleUrls: ['./resultat-trajets.component.css']
})
export class ResultatTrajetsComponent implements OnInit {
  @Input() trajets!: Trajet[];
  @Input() utilisateurs!: Utilisateur [];
  @Input() trajetsAvecConducteurs!: TrajetAvecConducteur[];

  constructor(){}

  ngOnInit(): void {
    this.trajetsAvecConducteurs = this.trajets
        .map(trajet => {
          const conducteur = this.utilisateurs.find(utilisateur => utilisateur.email === trajet.email);
          return { trajet, conducteur };
        })
        .filter(({ conducteur }) => conducteur !== undefined);
  }

  reserverTrajet(){
    
  }

}
