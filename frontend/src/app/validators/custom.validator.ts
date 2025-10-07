import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const password = formGroup.get(passwordField)?.value;
        const confirmPassword = formGroup.get(confirmPasswordField)?.value;

        if (password !== confirmPassword) {
            formGroup.get(confirmPasswordField)?.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        } else {
            formGroup.get(confirmPasswordField)?.setErrors(null);
            return null;
        }
    };
}
