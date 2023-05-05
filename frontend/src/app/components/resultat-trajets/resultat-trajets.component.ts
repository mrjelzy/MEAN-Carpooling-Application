import { Component, OnInit } from '@angular/core';
import { Trajet } from 'src/app/interfaces/Trajet';
import { TrajetService } from 'src/app/services/trajet.service';

@Component({
  selector: 'app-resultat-trajets',
  templateUrl: './resultat-trajets.component.html',
  styleUrls: ['./resultat-trajets.component.css']
})
export class ResultatTrajetsComponent implements OnInit {
  trajets!: Trajet[];

  constructor(private trajetService: TrajetService){}

  ngOnInit(): void{
    this.trajetService.getTrajets().subscribe(
      (trajets) => {
        this.trajets = trajets;
    });
  }
}
