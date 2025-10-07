import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputBase } from '../input-base';
import { ValidatorErrorsComponent } from '../validator-errors/validator-errors.component';
import { InputClearComponent } from '@/common/ui/input/input-clear/input-clear.component';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
    selector: 'dui-autocomplete-input',
    imports: [FormsModule, NgClass, ValidatorErrorsComponent, InputClearComponent, AutoComplete],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: AutoCompleteInputComponent
        }
    ],
    host: {
        class: 'field'
    },
    templateUrl: './auto-complete-input.component.html',
    standalone: true,
    styleUrl: './auto-complete-input.component.scss'
})
export class AutoCompleteInputComponent extends InputBase<string | null | undefined> {
    @Input() showEmptyMessage = true;
    @Input() emptyMessage: string = 'Nessun risultato';
    @Input() suggestions: any[] = [];
    @Input() optionLabel: string | undefined = undefined;
    @Input() dropdown = true;

    @Output() onSelect = new EventEmitter<any>();
    @Output() onClear = new EventEmitter<any>();
    @Output() completeMethod = new EventEmitter<any>();

    constructor(public override injector: Injector) {
        super(injector);
    }

    customClear() {
        this.onClear.emit();
        this.handleClear();
    }
}
