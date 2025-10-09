import { Component, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { FormUtilityService } from '@/common/services/form-utility.service';

@Component({
    selector: 'dui-validator-errors',
    imports: [],
    templateUrl: './validator-errors.component.html',
    standalone: true,
    styleUrl: './validator-errors.component.scss'
})
export class ValidatorErrorsComponent {
    @Input() control: FormControl | undefined;
    protected readonly Object = Object;

    constructor(private formConfigurator: FormUtilityService) {}

    get errors() {
        return this.formConfigurator.errorsText;
    }

    getErrorText(toReplace: string, params: ValidationErrors): string {
        if (toReplace == null) return toReplace;
        for (let p of Object.keys(params)) {
            toReplace = toReplace.replace(`{${p}}`, params[p]);
        }
        return toReplace;
    }
}
