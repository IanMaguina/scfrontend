import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstrategiaTipoPlanComponent } from './editar-estrategia-tipo-plan.component';

describe('EditarEstrategiaTipoPlanComponent', () => {
  let component: EditarEstrategiaTipoPlanComponent;
  let fixture: ComponentFixture<EditarEstrategiaTipoPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEstrategiaTipoPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstrategiaTipoPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
