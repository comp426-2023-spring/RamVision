import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionformComponent } from './submissionform.component';

describe('SubmissionformComponent', () => {
  let component: SubmissionformComponent;
  let fixture: ComponentFixture<SubmissionformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
