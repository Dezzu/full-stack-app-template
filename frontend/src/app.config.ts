import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import {
    CurrencyPipe,
    DATE_PIPE_DEFAULT_OPTIONS,
    DatePipe,
    DecimalPipe,
    HashLocationStrategy,
    LocationStrategy,
    UpperCasePipe
} from '@angular/common';
import { authInterceptor } from '@/interceptors/auth.service';
import { MessageService } from 'primeng/api';
import { JwtModule } from '@auth0/angular-jwt';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            appRoutes,
            withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
            withEnabledBlockingInitialNavigation()
        ),
        provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        MessageService,
        provideTranslateService({
            loader: provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json' })
        }),
        importProvidersFrom(
            JwtModule.forRoot({
                config: {
                    tokenGetter: () => localStorage.getItem('access_token')
                }
            })
        ),
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
