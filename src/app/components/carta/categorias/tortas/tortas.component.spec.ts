import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TortasComponent } from './tortas.component';

describe('TortasComponent', () => {
  let component: TortasComponent;
  let fixture: ComponentFixture<TortasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TortasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TortasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
