import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCompteUserComponent } from './login-compte-user.component';

describe('LoginCompteUserComponent', () => {
  let component: LoginCompteUserComponent;
  let fixture: ComponentFixture<LoginCompteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCompteUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCompteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
