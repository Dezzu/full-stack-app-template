import { ApplicationConfig, DEFAULT_CURRENCY_CODE, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { CurrencyPipe, DATE_PIPE_DEFAULT_OPTIONS, DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideKeycloakAngular, urlCondition } from './keycloak-init';
import { INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, includeBearerTokenInterceptor } from 'keycloak-angular';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideKeycloakAngular(),
        { provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, useValue: [urlCondition] },
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        MessageService,
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
        provideRouter(
            appRoutes,
            withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })
        ),
        provideTranslateService({
            loader: provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json' })
        }),
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'EUR'
        },
        {
            provide: DATE_PIPE_DEFAULT_OPTIONS,
            useValue: {
                dateFormat: 'dd/MM/yyyy HH:mm:ss'
            }
        },
        DatePipe,
        CurrencyPipe,
        UpperCasePipe,
        DecimalPipe
    ]
};
