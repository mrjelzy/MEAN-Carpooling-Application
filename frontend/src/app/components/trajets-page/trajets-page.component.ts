import { Component, Input, OnInit } from '@angular/core';
import { Trajet } from 'src/app/interfaces/Trajet';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { City } from 'src/app/interfaces/City';
import { AuthService } from 'src/app/services/auth.service';
import { NominatimService } from 'src/app/services/nominatim.service';
import { TrajetService } from 'src/app/services/trajet.service';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

type TrajetAvecConducteur = { trajet: Trajet, conducteur: Utilisateur | undefined };

@Component({
  selector: 'app-trajets-page',
  templateUrl: './trajets-page.component.html',
  styleUrls: ['./trajets-page.component.css']
})
export class TrajetsPageComponent implements OnInit {
  utilisateur !: Utilisateur | null;
  utilisateurs !: Utilisateur[];

  tousMesTrajetsC : TrajetAvecConducteur[] = [];
  mesTrajetsEnCoursC : TrajetAvecConducteur[] = [];
  mesTrajetsFinisC : TrajetAvecConducteur[] = [];

  tousMesTrajetsP : Trajet[] = []
  tousMesTrajetsPAvecConducteur : TrajetAvecConducteur[] = [];
  mesTrajetsEnCoursP : TrajetAvecConducteur[] = [];
  mesTrajetsFinisP : TrajetAvecConducteur[]= [];

  constructor(private authService : AuthService, 
    private trajetService : TrajetService, private utilisateurService: UtilisateursService, private nominatimService : NominatimService){
  }

  ngOnInit(): void {
    this.utilisateur = this.authService.getUtilisateur();

    this.trajetService.getMyTrajets().subscribe(
      (trajets) => {
        if(trajets.length > 0){
          this.tousMesTrajetsC = trajets.map(trajet => {
            const conducteur = this.utilisateur ? this.utilisateur : undefined;
            return { trajet, conducteur };
           }).filter(({ conducteur }) => conducteur !== undefined);

          this.mesTrajetsEnCoursC = this.tousMesTrajetsC.filter( trajet => trajet.trajet.heureArrive === null);
          this.mesTrajetsFinisC = this.tousMesTrajetsC.filter( trajet => trajet.trajet.heureArrive !== null);
      
        }
        
        });

      this.trajetService.getMyTrajetsPassager().subscribe(
        (trajets) => this.tousMesTrajetsP = trajets );



      this.utilisateurService.getUtilisateurs().subscribe(
        (utilisateurs) => {
          if(this.tousMesTrajetsP.length > 0){
            this.tousMesTrajetsPAvecConducteur = this.tousMesTrajetsP
            .map(trajet => {
            const conducteur = utilisateurs.find(utilisateur => utilisateur.email === trajet.email);
            return { trajet, conducteur };
          })
          .filter(({ conducteur }) => conducteur !== undefined);

          this.mesTrajetsEnCoursP = this.tousMesTrajetsPAvecConducteur.filter( trajet => trajet.trajet.heureArrive === null);
          this.mesTrajetsFinisP = this.tousMesTrajetsPAvecConducteur.filter( trajet => trajet.trajet.heureArrive !== null);
        
          }
}
      )

      console.log(this.tousMesTrajetsP);
  }

  terminerTrajet(trajet: Trajet){
      let villeDepart !: City;
      let villeArrive !: City;
      let distance = 0;
  
      this.nominatimService.getCity(trajet.villeDepart).subscribe((cities) => {
        villeDepart = cities[0];
        console.log(villeDepart.lon);
        console.log(villeDepart.lat);
  
        this.nominatimService.getCity(trajet.villeArrive).subscribe((cities) => {
          villeArrive = cities[0];
          console.log(villeArrive.lon);
          console.log(villeArrive.lat);
  
          this.nominatimService.getDistance(villeDepart.lon, villeDepart.lat, villeArrive.lon, villeArrive.lat).subscribe(
            (result) => {
              distance = result?.routes[0].distance / 1000;
              console.log(distance);
              
              const date = new Date();
              const heure = String(date.getHours()).padStart(2, "0"); // Récupère l'heure actuelle (0-23) avec zéro de remplissage
              const minutes = String(date.getMinutes()).padStart(2, "0"); // Récupère les minutes actuelles avec zéro de remplissage
  
              const heureFormattee = `${heure}:${minutes}`;
              console.log(heureFormattee);
              
              this.changeVitesse(trajet.heureDepart, heureFormattee, distance);

              const newtrajet : Trajet = {
                villeDepart: trajet.villeDepart,
                villeArrive: trajet.villeArrive,
                date: trajet.date,
                email: trajet.email,
                nbPlaces: trajet.nbPlaces,
                passagers: trajet.passagers,
                prix: trajet.prix,
                heureDepart: trajet.heureDepart,
                heureArrive: heureFormattee
              }
              const conducteur = this.utilisateur;
              if(conducteur){
                const index = this.mesTrajetsEnCoursC.indexOf({trajet, conducteur });
                this.mesTrajetsEnCoursC.splice(index, 1);
                this.mesTrajetsFinisC.push({trajet, conducteur })
              }


              if(trajet._id){
                this.trajetService.patchEndTrajet(trajet._id, newtrajet).subscribe((result) => {
                  console.log(result.message);
                });
               }
          });

  
        });
      });
    }

    private changeVitesse(heureDepart : String, heureArrive : String, distance : number){
      const dateDepart = new Date(`2000-01-01 ${heureDepart}`);
      const dateArrivee = new Date(`2000-01-01 ${heureArrive}`);

      // Calculer la différence de temps en millisecondes
      const differenceTemps = dateArrivee.getTime() - dateDepart.getTime();

      // Convertir la différence de temps en heures
      const differenceHeures = differenceTemps / (1000 * 60 * 60);

      // Calculer la vitesse moyenne
      const vitesse = distance / differenceHeures;

      if(this.utilisateur){
        let new_vitesse = Math.floor(((this.mesTrajetsFinisC.length) * this.utilisateur?.vitMoyenne + vitesse) / (this.mesTrajetsFinisC.length + 1));

        const user : Utilisateur = {
          vitMoyenne: new_vitesse,
          email: this.utilisateur.email,
          motDePasse: this.utilisateur.motDePasse,
          nom: this.utilisateur.nom,
          prenom: this.utilisateur.prenom,
          telephone: this.utilisateur.telephone,
          numPermis: this.utilisateur.numPermis,
          numImmatriculation: this.utilisateur.numImmatriculation
        }
        this.utilisateurService.patchUtilisateur(user).subscribe((result) => {
          console.log(result.message);
          this.authService.updateUtilisateur(user);
        })
      }

    }
}


