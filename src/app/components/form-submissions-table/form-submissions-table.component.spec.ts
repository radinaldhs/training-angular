import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmissionsTableComponent } from './form-submissions-table.component';

describe('FormSubmissionsTableComponent', () => {
  let component: FormSubmissionsTableComponent;
  let fixture: ComponentFixture<FormSubmissionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSubmissionsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubmissionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
