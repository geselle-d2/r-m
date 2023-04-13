import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import  {HttpClientModule} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CharactersComponent } from './views/characters/characters.component';
import { CharacterPortraitComponent } from './views/characters/character-portrait/character-portrait.component';
import { LocationsDetailsComponent } from './views/characters/locations-details/locations-details.component';
import { EpisodesDetailsComponent } from './views/characters/episodes-details/episodes-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    CharactersComponent,
    CharacterPortraitComponent,
    LocationsDetailsComponent,
    EpisodesDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
