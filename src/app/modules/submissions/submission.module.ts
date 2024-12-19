import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteConfirmationModalComponent } from '../../components/delete-confirmation-modal/delete-confirmation-modal.component';
import { EditFormSubmissionComponent } from '../../components/edit-form-submission/edit-form-submission.component';
import { FormSubmissionsTableComponent } from '../../components/form-submissions-table/form-submissions-table.component';
import { SubmissionRoutingModule } from '../../routing/submission-routing.module';
import { PokemonService } from '../../services/pokemon.service';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';

@NgModule({
  declarations: [
    FormSubmissionsTableComponent,
    EditFormSubmissionComponent,
    DeleteConfirmationModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubmissionRoutingModule,
  ],
})
export class SubmissionModule {}
