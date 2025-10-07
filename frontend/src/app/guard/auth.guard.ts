import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@/service/auth.service';
import { inject } from '@angular/core';

export const needAuthGuard: CanActivateFn = async (route, state) => {
    const authenticated = inject(AuthService).isAuthenticated();
    if (!authenticated) {
        await inject(Router).navigate(['/auth/login']);
        return false;
    }
    return true;
};

export const noAuthGuard: CanActivateFn = async (route, state) => {
    const authenticated = inject(AuthService).isAuthenticated();
    if (authenticated) {
        await inject(Router).navigate(['/gestionale']);
        return false;
    }
    return true;
};
