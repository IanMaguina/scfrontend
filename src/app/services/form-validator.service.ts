import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  constructor() { }


  handleFormChanges(form: any, fields: any, validationMessages: any, formSubmitted?: boolean): any {

    let formErrors: any = fields;

    if (!form) {
      return;
    }

    for (const fieldName in formErrors) {

      const formItem = form.get(fieldName);

      /* if (formItem.controls){
 
         // form item has children
         Object.keys(formItem.controls).forEach(keyCtrl => {
           console.log("formerror="+JSON.stringify(formItem));
           formErrors[fieldName][keyCtrl]='';
           
           let childControl = formItem.controls[keyCtrl];
          
           if (childControl && ( childControl.dirty || formSubmitted ) &&!childControl.valid){        
             const messages = validationMessages[(fieldName+'.'+keyCtrl)];
       
             for (const key in childControl.errors){              
               formErrors[fieldName][keyCtrl] += messages[key]+' ';
             }
           }
       
         });
 
       }else{
 */
      formErrors[fieldName] = '';
      //console.log("field "+fieldName+" dirty="+formItem.dirty+" valid="+formItem.valid)
      if (formItem && (formItem.dirty || formSubmitted) && !formItem.valid) {
        const messages = validationMessages[fieldName];

        for (const key in formItem.errors) {
          formErrors[fieldName] += messages[key] + ' ';
        }
      }

    }

    // }
    // console.debug("handleFormChanges : "+ JSON.stringify(formErrors) );
    return formErrors;
  }

}
