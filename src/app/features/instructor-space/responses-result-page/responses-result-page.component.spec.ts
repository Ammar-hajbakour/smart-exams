import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsesResultPageComponent } from './responses-result-page.component';

describe('ResponsesResultPageComponent', () => {
  let component: ResponsesResultPageComponent;
  let fixture: ComponentFixture<ResponsesResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsesResultPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsesResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
