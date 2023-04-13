import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './views/characters/characters.component';
import { CharacterPortraitComponent } from './views/characters/character-portrait/character-portrait.component';
import { LocationsDetailsComponent } from './views/characters/locations-details/locations-details.component';
import { EpisodesDetailsComponent } from './views/characters/episodes-details/episodes-details.component';

const routes: Routes = [
  {path:":path", component:CharactersComponent},
  {path:"location/:id", component:LocationsDetailsComponent},
  {path:"episode/:id", component:EpisodesDetailsComponent},
  {path:"character/:id", component:CharacterPortraitComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
