import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimengTranslateService } from '@/common/services/primeng-translate.service';
import { ConfigurationService } from '@/common/services/configuration.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    constructor(
        private configurationService: ConfigurationService,
        private translateService: PrimengTranslateService
    ) {}

    ngOnInit() {
        this.configurationService.loadFormErrors();
        this.translateService.init();
    }
}
