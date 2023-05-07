import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  welcome : boolean = false;
  email !: string;
  motDePasse !: string;

  constructor(private route: ActivatedRoute, private authService:AuthService, private router : Router){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.welcome = params['welcome'];
    });
  }

  onSubmit(){
    if (!this.email || !this.motDePasse ) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const utilisateur:Utilisateur = {
      email: this.email,
      motDePasse: this.motDePasse,
      nom: '',
      prenom: '',
      telephone: '',
      numPermis: '',
      numImmatriculation: '',
      vitMoyenne: 0
    }

    this.authService.login(utilisateur).subscribe(
      (resultat) => {
        if(resultat.resultat === 1){
          this.authService.setSession(resultat);
          this.authService.isLoggedIn().subscribe(
            (bool) => {
              if(bool)
                this.router.navigate(['profile']);
            }
          )
        }else{
          alert("Mauvais identifiant");
        }
      }
    );

    this.email = '';
    this.motDePasse = '';

  }

}
