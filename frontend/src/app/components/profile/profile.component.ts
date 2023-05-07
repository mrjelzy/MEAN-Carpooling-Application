import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { AuthService } from 'src/app/services/auth.service';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

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
  
  utilisateur !: Utilisateur | null;
  flamme: number = 1;

  constructor(private authService: AuthService, private utilisateurService: UtilisateursService){}

  ngOnInit(): void {
    this.utilisateur = this.authService.getUtilisateur();

    const vitesse = this.utilisateur?.vitMoyenne;
    if(vitesse)
      this.flamme = Math.floor( vitesse / 50);

    this.nom = this.utilisateur ? this.utilisateur.nom : '' ;
    this.prenom = this.utilisateur ? this.utilisateur.prenom : '' ;
    this.email = this.utilisateur ? this.utilisateur.email : '' ;
    this.tel = this.utilisateur ? this.utilisateur.telephone : '' ;
  }

  onSubmit(){
    if (!this.nom || !this.prenom || !this.tel) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if(this.utilisateur){
      const utilisateur: Utilisateur = {
        email: this.email,
        motDePasse: this.utilisateur.motDePasse,
        nom: this.nom,
        prenom: this.prenom,
        telephone: this.tel,
        numPermis: this.utilisateur.numPermis ,
        numImmatriculation: this.utilisateur.numPermis,
        vitMoyenne: this.utilisateur.vitMoyenne
      };

      this.utilisateurService.patchUtilisateur(utilisateur).subscribe((resultat) => {
        console.log(resultat); // gérer la réponse du serveur ici
        alert(resultat.message);
        this.authService.updateUtilisateur(utilisateur)
        this.utilisateur = this.authService.getUtilisateur();
      }, (erreur) => {
        console.log(erreur); // gérer l'erreur ici
      });
    }
      //mettre a jour les données

    /*
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
    */
  }

  getVitesse(){
    return this.utilisateur ? this.utilisateur.vitMoyenne > 0 : false;
  }
}

