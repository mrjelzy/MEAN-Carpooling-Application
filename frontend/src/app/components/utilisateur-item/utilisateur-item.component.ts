import { Component, Input, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';

@Component({
  selector: 'app-utilisateur-item',
  templateUrl: './utilisateur-item.component.html',
  styleUrls: ['./utilisateur-item.component.css']
})
export class UtilisateurItemComponent implements OnInit {
  @Input() utilisateur!: Utilisateur;
  flamme: number = 1;
  constructor(){
  }
  ngOnInit(): void {
    const vitesse = this.utilisateur?.vitMoyenne;
    if(vitesse)
      this.flamme = Math.floor( vitesse / 50);
  }

}
