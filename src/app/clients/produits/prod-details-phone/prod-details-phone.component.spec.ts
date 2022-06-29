import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdDetailsPhoneComponent } from './prod-details-phone.component';

describe('ProdDetailsPhoneComponent', () => {
  let component: ProdDetailsPhoneComponent;
  let fixture: ComponentFixture<ProdDetailsPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdDetailsPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdDetailsPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
