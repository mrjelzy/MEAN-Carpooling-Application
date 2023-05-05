import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { TrajetItemComponent } from './components/trajet-item/trajet-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResultatTrajetsComponent } from './components/resultat-trajets/resultat-trajets.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchbarComponent,
    TrajetItemComponent,
    ResultatTrajetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
