import { Component, EventEmitter, INJECTOR, Input, OnInit, Output } from '@angular/core';
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
  @Input() labelButton !: string;
  @Input() colorButton !: string;
  @Input() trajetAvecConducteur !: TrajetAvecConducteur;
  @Output() btnClick = new EventEmitter;
  flamme: number = 1;
  
  faFire = faFire;
  faArrowRight = faArrowRight;

  constructor() {
  }

  ngOnInit(): void {
    const vitesse = this.trajetAvecConducteur.conducteur?.vitMoyenne;
    if(vitesse)
      this.flamme = Math.floor( vitesse / 50);
  }

  onClick(){
    this.btnClick.emit();
  }
}
