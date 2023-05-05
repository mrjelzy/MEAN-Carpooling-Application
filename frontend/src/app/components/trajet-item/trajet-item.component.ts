import { Component } from '@angular/core';
import { faFire, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trajet-item',
  templateUrl: './trajet-item.component.html',
  styleUrls: ['./trajet-item.component.css']
})
export class TrajetItemComponent {
  faFire = faFire;
  faArrowRight = faArrowRight;
}
