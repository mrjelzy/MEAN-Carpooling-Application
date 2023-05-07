import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  nom !: string | null;
  prenom !: string;
  email !: string;
  tel !: string;
  motDePasse !: string ;
  utilisateur !: Utilisateur | null;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.utilisateur = this.authService.getUtilisateur();
    this.nom = this.utilisateur ? this.utilisateur.nom : '' ;
    this.prenom = this.utilisateur ? this.utilisateur.prenom : '' ;
    this.email = this.utilisateur ? this.utilisateur.email : '' ;

  }

  onSubmit(){
    if (!this.nom || !this.prenom || !this.email || !this.tel) {
      alert('Veuillez remplir tous les champs');
      return;
    }else if(false){
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    const utilisateur: Utilisateur = {
      email: this.email,
      motDePasse: this.motDePasse,
      nom: this.nom,
      prenom: this.prenom,
      telephone: this.tel,
      numPermis: '',
      numImmatriculation: '',
      vitMoyenne: 0
    }

  }
}
