import { Component, Injector, Input } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { InputBase } from '../input-base';
import { ValidatorErrorsComponent } from '../validator-errors/validator-errors.component';
import { InputClearComponent } from '@/common/ui/input/input-clear/input-clear.component';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
    selector: 'dui-text-input',
    imports: [
        InputText,
        FormsModule,
        NgClass,
        ValidatorErrorsComponent,
        InputClearComponent,
        IconField,
        InputIcon,
        NgTemplateOutlet
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: TextInputComponent
        }
    ],
    host: {
        class: 'field'
    },
    templateUrl: './text-input.component.html',
    standalone: true,
    styleUrl: './text-input.component.scss'
})
export class TextInputComponent extends InputBase<string | null | undefined> {
    @Input() icon: string | undefined = undefined;
    constructor(public override injector: Injector) {
        super(injector);
    }
}
