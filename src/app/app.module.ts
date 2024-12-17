import { NgModule, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonDetailPageComponent } from './components/pokemon-detail-page/pokemon-detail-page.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonPurchaseDrawerComponent } from './components/pokemon-purchase-drawer/pokemon-purchase-drawer.component';
import { CVModule } from './cv/cv.module';
import { provideHttpClient } from '@angular/common/http';
import { FormSubmissionsTableComponent } from './components/form-submissions-table/form-submissions-table.component';
import { DeleteConfirmationModalComponent } from './components/delete-confirmation-modal/delete-confirmation-modal.component';
import { EditFormSubmissionComponent } from './components/edit-form-submission/edit-form-submission.component';
import { PurchaseSuccessModalComponent } from './components/purchase-success-modal/purchase-success-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonDetailPageComponent,
    PokemonPurchaseDrawerComponent,
    FormSubmissionsTableComponent,
    DeleteConfirmationModalComponent,
    EditFormSubmissionComponent,
    PurchaseSuccessModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CVModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
