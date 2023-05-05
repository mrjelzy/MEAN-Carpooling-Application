import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trajet } from '../interfaces/Trajet';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TrajetService {
  private apiUrl = 'http://localhost:8888/trajets';


  constructor(private http: HttpClient) {}

  getTrajets() : Observable<Trajet[]>{
    return this.http.get<Trajet[]>(this.apiUrl);
  }
  
}
