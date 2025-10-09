import { Routes } from '@angular/router';
import { AppLayout } from '@/app-layout/component/app.layout';
import { LandingLayout } from '@/landing-layout/landing.layout';
import { canActivateGuard } from '@/guard/guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: LandingLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('@/pages/landing/landing.routes').then((m) => m.routes)
            }
        ],
        pathMatch: 'full'
    },
    {
        path: 'r',
        component: AppLayout,
        canActivate: [canActivateGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('@/pages/recipes/dashboard/dashboard.routes').then((m) => m.routes)
            },
            {
                path: 'pages',
                loadChildren: () => import('@/pages/recipes/pages.routes').then((m) => m.routes)
            }
        ]
    },
    { path: '**', redirectTo: '/notfound' }
];
