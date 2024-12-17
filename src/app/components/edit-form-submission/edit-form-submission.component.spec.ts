import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormSubmissionComponent } from './edit-form-submission.component';

describe('EditFormSubmissionComponent', () => {
  let component: EditFormSubmissionComponent;
  let fixture: ComponentFixture<EditFormSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFormSubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
