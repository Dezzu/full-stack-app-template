import { Component, Injector } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputBase } from '../input-base';
import { ValidatorErrorsComponent } from '../validator-errors/validator-errors.component';
import { InputClearComponent } from '@/common/ui/input/input-clear/input-clear.component';
import { Password } from 'primeng/password';

@Component({
    selector: 'dui-password-input',
    imports: [FormsModule, NgClass, ValidatorErrorsComponent, InputClearComponent, Password],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: PasswordInputComponent
        }
    ],
    host: {
        class: 'field'
    },
    templateUrl: './password-input.component.html',
    standalone: true,
    styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent extends InputBase<string | null | undefined> {
    constructor(public override injector: Injector) {
        super(injector);
    }
}
