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

    public login() {
        void this.keycloak.login({});
    }

    public logout() {
        void this.keycloak.logout();
    }
}
