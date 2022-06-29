import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdDetailsPcComponent } from './prod-details-pc.component';

describe('ProdDetailsPcComponent', () => {
  let component: ProdDetailsPcComponent;
  let fixture: ComponentFixture<ProdDetailsPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdDetailsPcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdDetailsPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
