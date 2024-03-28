import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";
import {Routes} from "../constant/routes";

export const needAuthGuard: CanActivateFn = async (route, state) => {
    const authenticated = inject(AuthService).isAuthenticated();
    if(!authenticated) {
        await inject(Router).navigate([Routes.LOGIN])
        return false;
    }
  return true;
};

export const noAuthGuard: CanActivateFn = async (route, state) => {
    const authenticated = inject(AuthService).isAuthenticated();
    if(authenticated) {
        await inject(Router).navigate([Routes.HOME])
        return false;
    }
    return true;
};
