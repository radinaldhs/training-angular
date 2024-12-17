import { Component, OnInit } from '@angular/core';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-submissions-table',
  templateUrl: './form-submissions-table.component.html',
  styleUrls: ['./form-submissions-table.component.css'],
  standalone: false,
})
export class FormSubmissionsTableComponent implements OnInit {
  submissions: any[] = [];
  deleteTarget: any = null;

  constructor(
    private databaseService: RealtimeDatabaseService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.fetchSubmissions();
  }

  async fetchSubmissions(): Promise<void> {
    try {
      const data = await this.databaseService.getFormSubmissions();
      this.submissions = Object.keys(data || {}).map((key) => ({
        id: key,
        ...data[key],
      }));
    } catch (error) {
      console.error('Error fetching form submissions:', error);
    }
  }

  editSubmission(submissionId: string): void {
    this.router.navigate(['/edit-form-submission', submissionId]);
  }

  openDeleteModal(submission: any): void {
    this.deleteTarget = submission;
  }

  closeDeleteModal(): void {
    this.deleteTarget = null;
  }

  async confirmDelete(): Promise<void> {
    if (!this.deleteTarget) return;

    try {
      await this.databaseService.deleteFormSubmission(this.deleteTarget.id);
      this.submissions = this.submissions.filter(
        (sub) => sub.id !== this.deleteTarget.id
      );
      this.closeDeleteModal();
    } catch (error) {
      console.error('Error deleting form submission:', error);
    }
  }
}
