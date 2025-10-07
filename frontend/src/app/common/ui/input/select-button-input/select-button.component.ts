import { Component, Injector, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputBase } from '../input-base';
import { ValidatorErrorsComponent } from '../validator-errors/validator-errors.component';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'dui-button-select-input',
    imports: [FormsModule, NgClass, ValidatorErrorsComponent, ReactiveFormsModule, SelectButton],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: SelectButtonComponent
        }
    ],
    host: {
        class: 'field'
    },
    templateUrl: './select-button.component.html',
    standalone: true,
    styleUrl: './select-button.component.scss'
})
export class SelectButtonComponent extends InputBase {
    @Input() options: any[] = [];
    @Input() optionLabel: string | undefined = undefined;
    @Input() optionValue: string | undefined = undefined;

    constructor(public override injector: Injector) {
        super(injector);
    }
}
