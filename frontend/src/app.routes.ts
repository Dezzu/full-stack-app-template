import { Routes } from '@angular/router';
import { AppLayout } from '@/layout/component/app.layout';
import { needAuthGuard, noAuthGuard } from '@/guard/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', loadChildren: () => import('@/gestionale/dashboard/dashboard.routes').then((m) => m.routes) },
            {
                path: 'gestionale',
                loadChildren: () => import('@/gestionale/gestionale.routes').then((m) => m.routes),
                canActivate: [needAuthGuard]
            }
        ]
    },
    {
        path: 'auth',
        loadChildren: () => import('@/common/auth/auth.routes').then((m) => m.routes),
        canActivate: [noAuthGuard]
    },
    { path: '**', redirectTo: '/notfound' }
];
