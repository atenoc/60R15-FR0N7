import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesListCajaComponent } from './ordenes-list-caja.component';

describe('OrdenesListCajaComponent', () => {
  let component: OrdenesListCajaComponent;
  let fixture: ComponentFixture<OrdenesListCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesListCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesListCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
