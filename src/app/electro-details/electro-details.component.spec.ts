import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectroDetailsComponent } from './electro-details.component';

describe('ElectroDetailsComponent', () => {
  let component: ElectroDetailsComponent;
  let fixture: ComponentFixture<ElectroDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectroDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
