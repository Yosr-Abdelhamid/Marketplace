import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrigerateursComponent } from './refrigerateurs.component';

describe('RefrigerateursComponent', () => {
  let component: RefrigerateursComponent;
  let fixture: ComponentFixture<RefrigerateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefrigerateursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefrigerateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
