import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {needAuthGuard, noAuthGuard} from "./guard/auth.guard";
import {Routes} from "./constant/routes";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: Routes.HOME, loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule), canActivate: [needAuthGuard] },
                ]
            },
            { path: Routes.AUTH, loadChildren: () => import('./common/auth/auth.module').then(m => m.AuthModule), canActivate: [noAuthGuard] },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
