import { Component, Input, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';

@Component({
  selector: 'app-top-utilisateurs',
  templateUrl: './top-utilisateurs.component.html',
  styleUrls: ['./top-utilisateurs.component.css']
})
export class TopUtilisateursComponent implements OnInit {
  @Input() utilisateurs !: Utilisateur[];
  @Input() title !: string;
  
  constructor(){

  }

  ngOnInit(): void {
    this.utilisateurs.sort((a, b) => b.vitMoyenne - a.vitMoyenne);
  }


}
