import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesBySellerComponent } from './commandes-by-seller.component';

describe('CommandesBySellerComponent', () => {
  let component: CommandesBySellerComponent;
  let fixture: ComponentFixture<CommandesBySellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandesBySellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandesBySellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
