import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvPageComponent } from './cv/cv-page/cv-page.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailPageComponent } from './components/pokemon-detail-page/pokemon-detail-page.component';
import { FormSubmissionsTableComponent } from './components/form-submissions-table/form-submissions-table.component';
import { EditFormSubmissionComponent } from './components/edit-form-submission/edit-form-submission.component';
import { AuthComponent } from './components/auth/auth.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

const routes: Routes = [
  // Auth Page (no layout)
  {
    path: 'auth',
    component: AuthComponent,
  },

  // Pages with Layout
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // CV Page
      { path: '', component: CvPageComponent },

      // Pokémon List
      { path: 'pokemon', component: PokemonListComponent },

      // Pokémon Details
      { path: 'pokemon-detail/:name', component: PokemonDetailPageComponent },

      // Edit Form Submission
      {
        path: 'edit-form-submission/:id',
        component: EditFormSubmissionComponent,
        canDeactivate: [CanDeactivateGuard],
      },

      // Form Submissions Table
      { path: 'submission', component: FormSubmissionsTableComponent },
    ],
  },

  // Fallback Route
  { path: '**', redirectTo: '' }, // Redirect unknown paths to the default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
