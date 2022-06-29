import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailClientComponent } from './verify-email-client.component';

describe('VerifyEmailClientComponent', () => {
  let component: VerifyEmailClientComponent;
  let fixture: ComponentFixture<VerifyEmailClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyEmailClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
