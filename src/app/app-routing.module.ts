import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './views/characters/characters.component';
import { CharacterPortraitComponent } from './views/characters/character-portrait/character-portrait.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path:"", component:NavigationComponent},
  {path:":path", component:CharactersComponent},
  {path:":path/:id", component:CharacterPortraitComponent},
  {path:'**', component:ErrorComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
