import { Component, EventEmitter, INJECTOR, Input, OnInit, Output } from '@angular/core';
import { faFire, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Trajet } from 'src/app/interfaces/Trajet';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { AuthService } from 'src/app/services/auth.service';

type TrajetAvecConducteur = { trajet: Trajet, conducteur: Utilisateur | undefined};

@Component({
  selector: 'app-trajet-item',
  templateUrl: './trajet-item.component.html',
  styleUrls: ['./trajet-item.component.css']
})
export class TrajetItemComponent implements OnInit{
  utilisateur !: Utilisateur | null;
  @Input() labelButton !: string;
  @Input() colorButton !: string;
  @Input() trajetAvecConducteur !: TrajetAvecConducteur;
  @Output() btnClick = new EventEmitter;
  flamme: number = 1;
  
  faFire = faFire;
  faArrowRight = faArrowRight;

  constructor(private authService :AuthService) {
  }

  ngOnInit(): void {
    this.utilisateur = this.authService.getUtilisateur();
    const vitesse = this.trajetAvecConducteur.conducteur?.vitMoyenne;
    if(vitesse)
      this.flamme = Math.floor( vitesse / 50);
  }

  onClick(){
    this.btnClick.emit();
  }

  formatDate(dateString : string) : string{
    const year = dateString.slice(0, 2);
    const month = dateString.slice(2, 4);
    const day = dateString.slice(4, 6);
    
    return `${day}/${month}/${year}`;
  }
}
