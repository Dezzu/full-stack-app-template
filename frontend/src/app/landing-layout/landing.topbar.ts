import { Component } from '@angular/core';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AuthService } from '@/common/services/auth.service';
import { AppConfigurator } from '@/app-layout/component/app.configurator';
import { LayoutService } from '@/app-layout/service/layout.service';
import Keycloak from 'keycloak-js';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-landing-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, Toolbar, PrimeTemplate, Button],
    template: ` <!-- navbar.component.html -->
        <p-toolbar>
            <ng-template pTemplate="start">
                <img style="height: 2.5rem; margin-right: 0.5rem" src="./assets/images/logo.png" alt="logo" />
                <span class="text-2xl font-bold">Ricette App</span>
            </ng-template>

            <ng-template pTemplate="end">
                @if (!authService.isAuthenticated()) {
                    <p-button
                        label="Accedi"
                        (click)="login()"
                        icon="fa-solid fa-right-to-bracket"
                        styleClass="p-button-rounded"
                    ></p-button>
                    <p-button
                        label="Registrati"
                        icon="fa-solid fa-user-plus"
                        styleClass="p-button-rounded ml-2"
                    ></p-button>
                } @else {
                    <p-button
                        label="Ricette"
                        (click)="goToRecipes()"
                        severity="info"
                        icon="fa-solid fa-book"
                        styleClass="p-button-rounded"
                    ></p-button>
                    <p-button
                        label="Esci"
                        severity="danger"
                        (click)="logout()"
                        icon="fa-solid fa-right-from-bracket"
                        styleClass="p-button-rounded ml-2"
                    ></p-button>
                }
            </ng-template>
        </p-toolbar>`
})
export class LandingTopbar {
    items!: MenuItem[];

    constructor(
        protected authService: AuthService,
        private router: Router
    ) {}

    goToRecipes() {
        void this.router.navigate(['/r']);
    }

    login() {
        void this.authService.login();
    }

    logout() {
        void this.router.navigate(['']).then(() => this.authService.logout());
    }
}
