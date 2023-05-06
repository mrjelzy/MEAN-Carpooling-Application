import { Component, INJECTOR, Input, OnInit } from '@angular/core';
import { faFire, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Trajet } from 'src/app/interfaces/Trajet';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';

type TrajetAvecConducteur = { trajet: Trajet, conducteur: Utilisateur | undefined};

@Component({
  selector: 'app-trajet-item',
  templateUrl: './trajet-item.component.html',
  styleUrls: ['./trajet-item.component.css']
})
export class TrajetItemComponent implements OnInit{
  @Input() trajetAvecConducteur !: TrajetAvecConducteur;
  flamme: number = 1;
  
  faFire = faFire;
  faArrowRight = faArrowRight;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.trajetAvecConducteur)
    const vitesse = this.trajetAvecConducteur.conducteur?.vitMoyenne;
    if(vitesse)
      this.flamme = Math.floor( vitesse / 50);
    }
}
