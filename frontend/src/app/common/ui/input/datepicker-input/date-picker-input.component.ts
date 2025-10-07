import { Component, Injector, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputBase } from '../input-base';
import { ValidatorErrorsComponent } from '../validator-errors/validator-errors.component';
import { InputClearComponent } from '@/common/ui/input/input-clear/input-clear.component';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'dui-datepicker-input',
    imports: [FormsModule, NgClass, ValidatorErrorsComponent, InputClearComponent, DatePicker],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: DatePickerInputComponent
        }
    ],
    host: {
        class: 'field'
    },
    templateUrl: './date-picker-input.component.html',
    standalone: true,
    styleUrl: './date-picker-input.component.scss'
})
export class DatePickerInputComponent extends InputBase<Date | null | undefined> {
    @Input() timeOnly = false;

    constructor(public override injector: Injector) {
        super(injector);
    }
}
