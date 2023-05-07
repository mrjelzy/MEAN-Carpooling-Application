import { Injectable } from '@angular/core';
import { Utilisateur } from '../interfaces/Utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultat } from '../interfaces/Resultat';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {
  private apiUrl = 'http://localhost:8888';

  constructor(private http: HttpClient) {}

  getUtilisateurs() : Observable<Utilisateur[]>{
    const url = `${this.apiUrl}/utilisateurs`;
    return this.http.get<Utilisateur[]>(url);
  }

  patchUtilisateur(utilisateur: Utilisateur): Observable<Resultat> {
    const url = `${this.apiUrl}/patch-utilisateur`;
    return this.http.patch<Resultat>(url, utilisateur, httpOptions);
  }

  addUtilisateur(utilisateur: Utilisateur): Observable<Resultat> {
    const url = `${this.apiUrl}/add-utilisateur`;
    return this.http.post<Resultat>(url, utilisateur, httpOptions);
  }
}
