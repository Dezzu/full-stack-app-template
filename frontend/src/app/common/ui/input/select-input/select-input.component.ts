import { Component, Injector, Input, TemplateRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { InputBase } from '../input-base';
import { ValidatorErrorsComponent } from '../validator-errors/validator-errors.component';
import { Select } from 'primeng/select';
import { MultiSelect } from 'primeng/multiselect';

export type SelectOption = {
    label: string;
    value: any;
    data?: any;
};

export enum SelectIconMode {
    SELECTION = 'selection',
    LIST = 'list',
    BOTH = 'both'
}

@Component({
    selector: 'dui-select-input',
    imports: [FormsModule, NgClass, ValidatorErrorsComponent, Select, NgTemplateOutlet, MultiSelect, NgIf],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: SelectInputComponent
        }
    ],
    host: {
        class: 'field'
    },
    templateUrl: './select-input.component.html',
    standalone: true,
    styleUrl: './select-input.component.scss'
})
export class SelectInputComponent extends InputBase<string | null | undefined> {
    @Input() optionLabel = 'label';
    @Input() optionValue = 'value';
    @Input() enableFilter = false;
    @Input() filterBy = '';
    @Input() options: SelectOption[] = [];

    @Input() multiple = false;

    @Input() iconMode: SelectIconMode | undefined = undefined;

    @Input() customSelections: TemplateRef<any> | null = null;
    @Input() customItems: TemplateRef<any> | null = null;
    @Input() customIcon: TemplateRef<any> | null = null;
    @Input() filterIcon: TemplateRef<any> | null = null;
    @Input() clearIcon: TemplateRef<any> | null = null;
    @Input() customHeader: TemplateRef<any> | null = null;
    @Input() customFooter: TemplateRef<any> | null = null;

    constructor(public override injector: Injector) {
        super(injector);
    }

    protected readonly SelectIconMode = SelectIconMode;
}
