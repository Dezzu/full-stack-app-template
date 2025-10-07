import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[duiTemplate]'
})
export class TemplateDirective {
    @Input('duiTemplate') name!: string;

    constructor(public template: TemplateRef<any>) {}
}
