import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
})
export class ConfirmDeleteDialogComponent {

    @Input("visible") visible: boolean;

    @Output("yes") yesEventEmitter: EventEmitter<void> = new EventEmitter<void>();
    @Output("no") noEventEmitter: EventEmitter<void> =  new EventEmitter<void>();

    onYes() {
        this.yesEventEmitter.emit();
    }

    onNo() {
        this.noEventEmitter.emit();
    }
}
