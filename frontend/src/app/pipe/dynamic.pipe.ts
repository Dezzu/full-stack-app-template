import { Injector, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dynamicPipe',
    standalone: true
})
export class DynamicPipe implements PipeTransform {
    constructor(private injector: Injector) {}

    transform(value: any, pipeToken: any, pipeArgs: any[] = []): any {
        if (!pipeToken) {
            return value;
        }
        try {
            const pipe = this.injector.get(pipeToken) as PipeTransform;
            return pipe.transform(value, ...pipeArgs);
        } catch (error) {
            console.warn(`Pipe ${pipeToken} non trovata`, error);
            return value;
        }
    }
}
