import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsPcComponent } from './product-details-pc.component';

describe('ProductDetailsPcComponent', () => {
  let component: ProductDetailsPcComponent;
  let fixture: ComponentFixture<ProductDetailsPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsPcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
