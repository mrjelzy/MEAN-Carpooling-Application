import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../interfaces/Utilisateur';
import { Resultat } from '../interfaces/Resultat';
import { BehaviorSubject, Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8888';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(utilisateur: Utilisateur){
    const url = `${this.apiUrl}/login`;
    return this.http.post<Resultat>(url, {email: utilisateur.email, motDePasse: utilisateur.motDePasse}, httpOptions);
  }

  setSession(resultat : Resultat) {
    this.loggedIn.next(true);
    localStorage.setItem('id_token', resultat.token);
  }    

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem("id_token");
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getToken(){
    return localStorage.getItem("id_token");
  }

}
