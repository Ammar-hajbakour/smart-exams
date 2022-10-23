import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetailsPageComponent } from './exam-details-page.component';

describe('ExamDetailsPageComponent', () => {
  let component: ExamDetailsPageComponent;
  let fixture: ComponentFixture<ExamDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
