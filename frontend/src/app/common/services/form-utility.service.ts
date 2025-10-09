import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormUtilityService {
    //Ricorda da ricaricare quando cambia la lingua e allo start dell'applicazione
    errorsText: { [key: string]: string } = {};

    constructor() {}

    loadErrors(errors: { [key: string]: string }) {
        this.errorsText = errors;
    }

    markFormDirty(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((key) => {
            this.markAsDirty(formGroup, key);
        });
    }

    markArrayDirty(formArray: FormArray) {
        formArray.controls.forEach((control) => {
            this.markAsDirty(control, null);
        });
    }

    markAsDirty(formElement: AbstractControl, key: string | null) {
        let tempControl = key == null ? formElement : formElement.get(key);
        if (tempControl instanceof FormGroup) {
            this.markFormDirty(tempControl as FormGroup);
            return;
        }
        if (tempControl instanceof FormArray) {
            this.markArrayDirty(tempControl as FormArray);
            return;
        }
        if (tempControl instanceof FormControl) {
            this.markControlDirty(tempControl as FormControl);
            return;
        }
    }

    markControlDirty(formControl: FormControl) {
        formControl.markAsDirty();
    }
}
