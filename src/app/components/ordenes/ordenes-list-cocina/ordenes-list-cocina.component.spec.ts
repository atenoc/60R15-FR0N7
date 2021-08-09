import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesListCocinaComponent } from './ordenes-list-cocina.component';

describe('OrdenesListCocinaComponent', () => {
  let component: OrdenesListCocinaComponent;
  let fixture: ComponentFixture<OrdenesListCocinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesListCocinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesListCocinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
