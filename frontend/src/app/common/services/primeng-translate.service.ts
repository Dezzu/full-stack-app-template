import { Injectable } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { Translation } from 'primeng/api';
import translations from '../../../assets/it.json';

@Injectable({
    providedIn: 'root'
})
export class PrimengTranslateService {
    constructor(private config: PrimeNG) {}

    init(res?: Translation) {
        if (!res) {
            this.config.setTranslation(translations);
            return;
        }
        this.config.setTranslation(res);
    }
}
