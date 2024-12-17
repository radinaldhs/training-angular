// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvPageComponent } from './cv/cv-page/cv-page.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailPageComponent } from './components/pokemon-detail-page/pokemon-detail-page.component';
import { FormSubmissionsTableComponent } from './components/form-submissions-table/form-submissions-table.component';
import { EditFormSubmissionComponent } from './components/edit-form-submission/edit-form-submission.component';

const routes: Routes = [
  { path: '', component: CvPageComponent },
  { path: 'pokemon', component: PokemonListComponent },
  { path: 'pokemon-detail/:name', component: PokemonDetailPageComponent },
  { path: 'submission', component: FormSubmissionsTableComponent },
  { path: 'edit-form-submission/:id', component: EditFormSubmissionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
