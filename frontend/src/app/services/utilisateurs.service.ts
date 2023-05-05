import { Injectable } from '@angular/core';
import { Utilisateur } from '../interfaces/Utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {
  private apiUrl = 'http://localhost:8888/utilisateurs';

  constructor(private http: HttpClient) {}

  getUtilisateurs() : Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(this.apiUrl);
  }
}
