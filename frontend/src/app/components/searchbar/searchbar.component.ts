import { Component, Output, EventEmitter } from '@angular/core';
import { Search } from 'src/app/interfaces/Search';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  depart!: string;
  arrivee!:string;
  dateString!: string;
  @Output() onSearch: EventEmitter<Search> = new EventEmitter();

  onSubmit(){
    if (!this.depart || !this.arrivee || !this.dateString) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const date = new Date(this.dateString);
    
    const year = date.getFullYear().toString().substr(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    const formattedDate = year + month + day;

    const search : Search = {
      villeDepart: this.depart,
      villeArrive: this.arrivee,
      date: formattedDate,
      nbPlaces: 0,
      prix: 0,
      heureDepart: ''
    } 

    this.onSearch.emit(search);

    this.depart = '';
    this.arrivee = '';
    this.dateString = '';

  }
}
