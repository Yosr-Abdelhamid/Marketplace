import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdDetailsElectroComponent } from './prod-details-electro.component';

describe('ProdDetailsElectroComponent', () => {
  let component: ProdDetailsElectroComponent;
  let fixture: ComponentFixture<ProdDetailsElectroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdDetailsElectroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdDetailsElectroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
