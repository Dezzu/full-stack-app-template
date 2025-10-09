import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { AuthService } from '@/common/services/auth.service';

const isAccessAllowed = async (
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot,
    authData: AuthGuardData
): Promise<boolean | UrlTree> => {
    const { authenticated } = authData;
    const authService = inject(AuthService);

    if (authenticated) {
        return true;
    }

    authService.login();
    return false;
};

export const canActivateGuard = createAuthGuard<CanActivateFn>(isAccessAllowed);
