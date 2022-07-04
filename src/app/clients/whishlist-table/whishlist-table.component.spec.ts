import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhishlistTableComponent } from './whishlist-table.component';

describe('WhishlistTableComponent', () => {
  let component: WhishlistTableComponent;
  let fixture: ComponentFixture<WhishlistTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhishlistTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhishlistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
