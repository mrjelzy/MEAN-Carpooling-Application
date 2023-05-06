import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Resultat } from 'src/app/interfaces/Resultat';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  nom !: string;
  prenom !: string;
  email !: string;
  tel !: string;
  motDePasse !: string;
  cmotDePasse !: string;

  constructor(private utilisateurService: UtilisateursService, private router: Router){}

  onSubmit(){
    if (!this.nom || !this.prenom || !this.email || !this.tel || !this.motDePasse || !this.cmotDePasse) {
      alert('Veuillez remplir tous les champs');
      return;
    }else if(this.cmotDePasse !== this.motDePasse){
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

    this.utilisateurService.addUtilisateur(utilisateur).subscribe(
      (resultat : Resultat) => {
        if(resultat.resultat === 0){
          alert(resultat.message);
        }else{
          this.router.navigate(['login'], {queryParams: {welcome: true}});
        }
      });

  }
}
