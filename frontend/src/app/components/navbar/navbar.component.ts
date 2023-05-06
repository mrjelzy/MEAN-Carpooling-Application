import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  title: string = "Covoiturace";
  connected !: Observable<boolean>;

  constructor(private authService : AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.connected = this.authService.isLoggedIn();
  }

  logoutClicked(){
    this.authService.logout();
    return this.router.navigate(['']);
  }

}
