import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvPageComponent } from './cv/cv-page/cv-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutPageComponent } from './components/checkout/checkout-page.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CvPageComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutPageComponent },
      {
        path: 'pokemon',
        loadChildren: () =>
          import('./modules/pokemon/pokemon.module').then(
            (m) => m.PokemonModule
          ),
      },
      {
        path: 'submission',
        loadChildren: () =>
          import('./modules/submissions/submission.module').then(
            (m) => m.SubmissionModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
