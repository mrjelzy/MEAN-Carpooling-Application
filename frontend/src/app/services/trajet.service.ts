import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trajet } from '../interfaces/Trajet';
import { Search } from '../interfaces/Search';
import { Resultat } from '../interfaces/Resultat';
import { Types } from 'mongoose';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TrajetService {
  private apiUrl = 'http://localhost:8888';


  constructor(private http: HttpClient) {}

  getTrajets() : Observable<Trajet[]>{
    const url = `${this.apiUrl}/trajets`;
    return this.http.get<Trajet[]>(url);
  }

  getTrajetsAvecFiltre(search: Search) : Observable<Trajet[]>{
    const url = `${this.apiUrl}/trajets/${search.villeDepart}/${search.villeArrive}/${search.date}`;
    return this.http.get<Trajet[]>(url);
  }

  getMyTrajets() : Observable<Trajet[]>{
    const url = `${this.apiUrl}/my-trajets`;
    return this.http.get<Trajet[]>(url);
  }

  getMyTrajetsPassager() : Observable<Trajet[]>{
    const url = `${this.apiUrl}/my-trajets-passager`;
    return this.http.get<Trajet[]>(url);
  }

  patchReservation(id : Types.ObjectId) : Observable<Resultat>{
    const url = `${this.apiUrl}/add-passager/${id}`;
    return this.http.patch<Resultat>(url, {});
  }

  addTrajet(t: Trajet) : Observable<Resultat>{
    const url = `${this.apiUrl}/add-trajet`;
    return this.http.post<Resultat>(url, t, httpOptions);
  }
  

  patchEndTrajet(id : Types.ObjectId, trajet: Trajet) : Observable<Resultat>{
    const url = `${this.apiUrl}/end-trajet/${id}`;
    return this.http.patch<Resultat>(url, trajet);
  }
  
}
