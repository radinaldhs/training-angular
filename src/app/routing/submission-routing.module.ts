import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSubmissionsTableComponent } from '../components/form-submissions-table/form-submissions-table.component';
import { EditFormSubmissionComponent } from '../components/edit-form-submission/edit-form-submission.component';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', component: FormSubmissionsTableComponent },
  {
    path: 'edit-form-submission/:id',
    component: EditFormSubmissionComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmissionRoutingModule {}
