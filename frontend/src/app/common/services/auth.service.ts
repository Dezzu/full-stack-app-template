import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private keycloak: Keycloak) {}

    public isAuthenticated() {
        return this.keycloak.authenticated;
    }

    public login(redirectUri?: string) {
        if (redirectUri) {
            redirectUri = window.location.origin + '/' + redirectUri;
        }
        void this.keycloak.login({ redirectUri });
    }

    public logout() {
        void this.keycloak.logout();
    }
}
