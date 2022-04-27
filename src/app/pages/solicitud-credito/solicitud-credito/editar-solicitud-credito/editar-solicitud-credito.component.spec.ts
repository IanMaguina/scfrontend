import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSolicitudCreditoComponent } from './editar-solicitud-credito.component';

describe('EditarSolicitudCreditoComponent', () => {
  let component: EditarSolicitudCreditoComponent;
  let fixture: ComponentFixture<EditarSolicitudCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarSolicitudCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSolicitudCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
