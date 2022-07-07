import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '@services/snack-bar.service';
import { Plan } from 'src/app/models/plan.interface';
import { TipoPlanCredito } from 'src/app/models/tipo-plan-credito.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { TipoPlanService } from 'src/app/services/tipo-plan.service';
import { PlanService } from './../../../../services/plan.service';

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styles: [
  ]
})
export class CrearPlanComponent implements OnInit {

  listadoTipoPlanes: TipoPlanCredito[] = [];
  crearFormDialog: any;
  formErrors = {
    'plan': '',
  }
  validationMessages = {
    'plan': {
      'required': 'el nombre es requerido.'
    },
  };
  //Submitted form
  submitted = false;
  carga: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CrearPlanComponent>,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private planService: PlanService, 
    private tipoPlanService: TipoPlanService
  ) {
    this.crearFormDialog = this.formBuilder.group({
      plan: ['', Validators.required],
    })
    this.crearFormDialog.valueChanges.subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.crearFormDialog, this.formErrors, this.validationMessages, this.submitted);
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.listarTipoPlanesNoAgregados();
  }

  async listarTipoPlanesNoAgregados() {
    this.tipoPlanService.listarTipoPlanes().then(data => {
      this.listadoTipoPlanes = data.payload;
      console.log(JSON.stringify(this.listadoTipoPlanes));
    })
  }

  async crearPlan(form: any) {
    let plan = await this.mapeoPlan(form)
    //console.log("crearplan:" + JSON.stringify(plan));
    this.planService.crearPlan(plan).then((result) => {
      if(result.header.exito){
        this.onNoClick('CONFIRM_DLG_YES');
      }else{
        this.onNoClick('CONFIRM_DLG_NO');
      } 
    }); 

  }

  async mapeoPlan(form: any) {
   // console.log("crearPlan--->" + JSON.stringify(form));
    let plan: Plan = {
      "id_tipo_plan_credito": form.plan.id,
      "carta_fianza": null,
      "id_tipo_moneda": null,
      "bolsa": null,
      "camiones": null,
      "revision_mensual": null
    }
    return plan;
  }

  onNoClick(msg:string): void {
    this.dialogRef.close(msg);
  }

}
