import { AbstractControl, ValidatorFn } from '@angular/forms';
export default class CompareNewConditionCredit {
    static match(controlName: string, checkControlName: string): ValidatorFn {

        return (controls: AbstractControl) => {

            const control = controls.get(controlName);
            const checkControl = controls.get(checkControlName);
            
            if (checkControl?.errors && !checkControl.errors['compare']) {
                return null;
            }

            if (checkControl?.value <= control?.value) {
                controls.get(checkControlName)?.setErrors({ compare: true });
                return { compare: true };
            } else {
                return null;
            }
        };
    }
}