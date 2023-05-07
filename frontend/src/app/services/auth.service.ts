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
  private utilisateur !: Utilisateur | null;

  constructor(private http: HttpClient) {}

  login(utilisateur: Utilisateur){
    const url = `${this.apiUrl}/login`;
    return this.http.post<Resultat>(url, {email: utilisateur.email, motDePasse: utilisateur.motDePasse}, httpOptions);
  }

  setSession(resultat : Resultat) {
    localStorage.setItem('id_token', resultat.token);


    this.setUtilisateur().subscribe(
      (utilisateur) => {
        this.utilisateur = utilisateur;
        this.loggedIn.next(true);
      }
    )

  }    

  logout() {
    this.loggedIn.next(false);
    this.utilisateur = null;
    localStorage.removeItem("id_token");
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getToken(){
    return localStorage.getItem("id_token");
  }

  getUtilisateur(){
    return this.utilisateur;
  }

  setUtilisateur() : Observable<Utilisateur>{
    const url = `${this.apiUrl}/utilisateur`;
    return this.http.get<Utilisateur>(url);
  }

  updateUtilisateur(utilisateur : Utilisateur){
    if(utilisateur !== this.utilisateur){
      this.setUtilisateur().subscribe(
        (user) => this.utilisateur = user)
    }
  }

}
