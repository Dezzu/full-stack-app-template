import { EnvironmentProviders } from '@angular/core';
import { createInterceptorCondition, IncludeBearerTokenCondition, provideKeycloak } from 'keycloak-angular';
import { environment } from './environments/environment';

export const provideKeycloakAngular: () => EnvironmentProviders = () =>
    provideKeycloak({
        config: {
            url: environment.kcUrl,
            realm: environment.kcRealm,
            clientId: environment.kcClientId
        },
        initOptions: {
            onLoad: 'check-sso'
        }
    });

export const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: /^(.*)?$/i,
    bearerPrefix: 'Bearer'
});
