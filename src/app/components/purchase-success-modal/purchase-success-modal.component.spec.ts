import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSuccessModalComponent } from './purchase-success-modal.component';

describe('PurchaseSuccessModalComponent', () => {
  let component: PurchaseSuccessModalComponent;
  let fixture: ComponentFixture<PurchaseSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseSuccessModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
