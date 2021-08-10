import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesListMeseroComponent } from './ordenes-list-mesero.component';

describe('OrdenesListMeseroComponent', () => {
  let component: OrdenesListMeseroComponent;
  let fixture: ComponentFixture<OrdenesListMeseroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesListMeseroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesListMeseroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
