import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorExamsPageComponent } from './instructor-exams-page.component';

describe('InstructorExamsPageComponent', () => {
  let component: InstructorExamsPageComponent;
  let fixture: ComponentFixture<InstructorExamsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorExamsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorExamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
