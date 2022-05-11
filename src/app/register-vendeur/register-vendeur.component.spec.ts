import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVendeurComponent } from './register-vendeur.component';

describe('RegisterVendeurComponent', () => {
  let component: RegisterVendeurComponent;
  let fixture: ComponentFixture<RegisterVendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterVendeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
