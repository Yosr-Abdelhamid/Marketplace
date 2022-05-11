import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageVendeurComponent } from './page-vendeur.component';

describe('PageVendeurComponent', () => {
  let component: PageVendeurComponent;
  let fixture: ComponentFixture<PageVendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageVendeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
