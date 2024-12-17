import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-purchase-success-modal',
  templateUrl: './purchase-success-modal.component.html',
  styleUrls: ['./purchase-success-modal.component.css'],
  standalone: false,
})
export class PurchaseSuccessModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() continueBrowsing = new EventEmitter<void>();
  @Output() goToSubmission = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  continue(): void {
    this.continueBrowsing.emit();
  }

  goToSubmissionPage(): void {
    this.goToSubmission.emit();
  }
}
