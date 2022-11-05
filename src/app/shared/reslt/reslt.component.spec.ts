import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResltComponent } from './reslt.component';

describe('ResltComponent', () => {
  let component: ResltComponent;
  let fixture: ComponentFixture<ResltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
