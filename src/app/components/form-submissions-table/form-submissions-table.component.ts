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
  filteredSubmissions: any[] = [];
  deleteTarget: any = null;

  // Pagination and search controls
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  searchQuery: string = '';

  constructor(
    private databaseService: RealtimeDatabaseService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fetchSubmissions();
    this.applyFiltersAndPagination();
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

  applyFiltersAndPagination(): void {
    // Filter submissions based on the search query
    const filtered = this.submissions.filter((submission) =>
      `${submission.firstName} ${submission.lastName}`
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );

    // Calculate total pages
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);

    // Paginate filtered submissions
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredSubmissions = filtered.slice(start, end);
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
      this.applyFiltersAndPagination();
    } catch (error) {
      console.error('Error deleting form submission:', error);
    }
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.applyFiltersAndPagination();
    }
  }

  onItemsPerPageChange(newLimit: number): void {
    this.itemsPerPage = newLimit;
    this.currentPage = 1; // Reset to the first page
    this.applyFiltersAndPagination();
  }

  onSearchChange(): void {
    this.currentPage = 1; // Reset to the first page
    this.applyFiltersAndPagination();
  }
}
