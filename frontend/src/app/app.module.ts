import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { TrajetItemComponent } from './components/trajet-item/trajet-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResultatTrajetsComponent } from './components/resultat-trajets/resultat-trajets.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from './components/button/button.component';
import { UtilisateurItemComponent } from './components/utilisateur-item/utilisateur-item.component';
import { TopUtilisateursComponent } from './components/top-utilisateurs/top-utilisateurs.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { JwtInterceptor } from './providers/jwt.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { TrajetsPageComponent } from './components/trajets-page/trajets-page.component';
import { ProposerPageComponent } from './components/proposer-page/proposer-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchbarComponent,
    TrajetItemComponent,
    ResultatTrajetsComponent,
    HomePageComponent,
    ButtonComponent,
    UtilisateurItemComponent,
    TopUtilisateursComponent,
    RegisterPageComponent,
    LoginPageComponent,
    ProfileComponent,
    TrajetsPageComponent,
    ProposerPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule, 
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
