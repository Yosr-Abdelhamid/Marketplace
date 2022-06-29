import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcPortablesComponent } from './pc-portables.component';

describe('PcPortablesComponent', () => {
  let component: PcPortablesComponent;
  let fixture: ComponentFixture<PcPortablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcPortablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcPortablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
