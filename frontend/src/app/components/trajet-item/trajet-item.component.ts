import { Component, Input, OnInit } from '@angular/core';
import { faFire, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Trajet } from 'src/app/interfaces/Trajet';

@Component({
  selector: 'app-trajet-item',
  templateUrl: './trajet-item.component.html',
  styleUrls: ['./trajet-item.component.css']
})
export class TrajetItemComponent implements OnInit{
  @Input() trajet!: Trajet;
  faFire = faFire;
  faArrowRight = faArrowRight;

  constructor() {
    console.log(this.trajet);
  }

  ngOnInit(): void {
    console.log(this.trajet);
  }
}
