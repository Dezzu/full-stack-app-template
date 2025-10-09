import { Injectable } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { FormUtilityService } from '@/common/services/form-utility.service';
import { PrimengTranslateService } from '@/common/services/primeng-translate.service';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {
    errorsObject: { [key: string]: string } = {
        required: 'form.required',
        minlength: 'form.minlength',
        maxlength: 'form.maxlength',
        min: 'form.min',
        max: 'form.max',
        passwordMismatch: 'form.passwordMismatch'
    };

    errorsTranslated: { [key: string]: string } = {};

    constructor(
        private formConfigurator: FormUtilityService,
        private translateService: TranslateService,
        private customTranslateService: PrimengTranslateService
    ) {
        this.translateService.setFallbackLang(this.translateService.getBrowserLang() ?? 'it');
        this.customTranslateService.init();
    }

    loadFormErrors() {
        this.formConfigurator.loadErrors(this.errorsObject);

        let forkJoinArray: { [key: string]: Observable<string> } = {};

        for (let key of Object.keys(this.errorsObject)) {
            forkJoinArray[key] = this.translateService.get(_(this.errorsObject[key]), {});
        }

        forkJoin(forkJoinArray).subscribe((res: { [key: string]: string }) => {
            this.errorsTranslated = res;
            this.formConfigurator.loadErrors(this.errorsTranslated);
        });
    }
}
