import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsListPageComponent } from './exams-list-page.component';

describe('ExamsListPageComponent', () => {
  let component: ExamsListPageComponent;
  let fixture: ComponentFixture<ExamsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
