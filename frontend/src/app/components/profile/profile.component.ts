import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  utilisateur !: Utilisateur | null;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.utilisateur = this.authService.getUtilisateur();
  }
}
