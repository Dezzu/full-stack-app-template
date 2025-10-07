import { Component, Injector, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import { InputBase } from '../input-base';
import { ValidatorErrorsComponent } from '../validator-errors/validator-errors.component';
import { InputClearComponent } from '@/common/ui/input/input-clear/input-clear.component';
import { InputNumber } from 'primeng/inputnumber';

@Component({
    selector: 'dui-number-input',
    imports: [
        FormsModule,
        NgClass,
        ValidatorErrorsComponent,
        InputClearComponent,
        InputNumber,
        ReactiveFormsModule,
        NgStyle
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: NumberInputComponent
        }
    ],
    host: {
        class: 'field'
    },
    templateUrl: './number-input.component.html',
    standalone: true,
    styleUrl: './number-input.component.scss'
})
export class NumberInputComponent extends InputBase<number | null | undefined> {
    @Input() prefix: string | undefined;
    @Input() suffix: string | undefined;
    @Input() showButtons = true;
    @Input() min: number | undefined;
    @Input() max: number | undefined;
    @Input() minFractionDigits = 0;
    @Input() maxFractionDigits = 5;
    @Input() step = 1;
    @Input() currency: string | undefined = 'EUR';
    @Input() mode = 'decimal';
    @Input() useGrouping = false;

    constructor(public override injector: Injector) {
        super(injector);
    }
}
