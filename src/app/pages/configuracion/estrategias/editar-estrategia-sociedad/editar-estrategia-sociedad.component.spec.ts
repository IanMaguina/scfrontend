import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstrategiaSociedadComponent } from './editar-estrategia-sociedad.component';

describe('EditarEstrategiaSociedadComponent', () => {
  let component: EditarEstrategiaSociedadComponent;
  let fixture: ComponentFixture<EditarEstrategiaSociedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEstrategiaSociedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstrategiaSociedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
