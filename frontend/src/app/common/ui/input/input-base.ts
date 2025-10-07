import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { AfterViewInit, Component, Injector, Input } from '@angular/core';
import { v4 as uuid } from 'uuid';

export type InputLabelPosition = 'in' | 'on' | 'over';
export type AutoCompleteActivation = 'on' | 'off';

@Component({
    selector: 'dui-text-base',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: InputBase
        }
    ],
    template: '',
    standalone: true
})
export class InputBase<T = any | undefined> implements ControlValueAccessor, AfterViewInit {
    disabled = false;
    value?: T;
    control!: FormControl;
    uuid: string = uuid();

    @Input() label: string | undefined;
    @Input() labelPosition: InputLabelPosition = 'on';
    @Input() labelFor: string | undefined;
    @Input() inputId: string | undefined;
    @Input() loading = false;
    @Input() inputClass = '';
    @Input() autocomplete: AutoCompleteActivation = 'off';
    @Input() showClear = true;
    @Input() placeholder: string | undefined = undefined;

    protected constructor(public injector: Injector) {}

    ngAfterViewInit(): void {
        const ngControl: NgControl | null = this.injector.get(NgControl, null);
        if (ngControl) {
            setTimeout(() => {
                this.control = ngControl.control as FormControl;
            });
        }
    }

    onChange(value: T | undefined) {}

    onTouch() {}

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(obj: T): void {
        this.value = obj;
    }

    updateValue(value: T) {
        this.markAsTouched();
        this.onChange(value);
    }

    markAsTouched() {
        this.onTouch();
    }

    handleClear() {
        this.control.reset(undefined);
    }
}
