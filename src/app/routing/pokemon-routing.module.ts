import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from '../components/pokemon-list/pokemon-list.component';
import { PokemonDetailPageComponent } from '../components/pokemon-detail-page/pokemon-detail-page.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon-detail/:name', component: PokemonDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
