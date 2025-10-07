import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'dui-input-clear',
    imports: [IconField, InputIcon, NgTemplateOutlet],
    templateUrl: './input-clear.component.html',
    styleUrl: './input-clear.component.scss',
    standalone: true
})
export class InputClearComponent {
    @Input() showClear = true;
    @Input() value: any | undefined;

    @Output('clear') clearEventEmitter: EventEmitter<void> = new EventEmitter<void>();

    emitClear() {
        this.clearEventEmitter.emit();
    }
}
