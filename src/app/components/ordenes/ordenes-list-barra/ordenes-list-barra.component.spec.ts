import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesListBarraComponent } from './ordenes-list-barra.component';

describe('OrdenesListBarraComponent', () => {
  let component: OrdenesListBarraComponent;
  let fixture: ComponentFixture<OrdenesListBarraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesListBarraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesListBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
