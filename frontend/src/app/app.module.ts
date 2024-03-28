import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';
import {DATE_PIPE_DEFAULT_OPTIONS, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppLayoutModule} from './layout/app.layout.module';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.service";
import {JwtModule} from "@auth0/angular-jwt";
import {CommonAppModule} from "./common/common.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonAppModule,
        JwtModule.forRoot({
            config: {
                tokenGetter:  () => localStorage.getItem('access_token')
            }
        })
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'EUR'
        },
        {
            provide: DATE_PIPE_DEFAULT_OPTIONS,
            useValue: {
                dateFormat: "dd/MM/yyyy HH:mm:ss"
            }
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
