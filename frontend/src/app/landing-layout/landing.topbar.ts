import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AuthService } from '@/common/services/auth.service';
import { AppConfigurator } from '@/app-layout/component/app.configurator';
import { LayoutService } from '@/app-layout/service/layout.service';
import Keycloak from 'keycloak-js';

@Component({
    selector: 'app-landing-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="">
                <img
                    src="./assets/images/{{ !layoutService.isDarkTheme() ? 'logo-dark' : 'logo-white' }}.svg"
                    alt="logo"
                />
                <span>Template</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i
                        [ngClass]="{
                            'pi ': true,
                            'pi-moon': layoutService.isDarkTheme(),
                            'pi-sun': !layoutService.isDarkTheme()
                        }"
                    ></i>
                </button>
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
                pStyleClass="@next"
                enterFromClass="hidden"
                enterActiveClass="animate-scalein"
                leaveToClass="hidden"
                leaveActiveClass="animate-fadeout"
                [hideOnOutsideClick]="true"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    @if (authService.isAuthenticated()) {
                        <button type="button" class="layout-topbar-action" (click)="logout()">
                            <i class="fa-solid fa-right-from-bracket"></i>
                            <span>Esci</span>
                        </button>
                    } @else {
                        <button type="button" class="layout-topbar-action" (click)="login()">
                            <i class="fa-solid fa-right-to-bracket"></i>
                            <span>Login</span>
                        </button>
                    }
                </div>
            </div>
        </div>
    </div>`
})
export class LandingTopbar {
    items!: MenuItem[];

    constructor(
        public layoutService: LayoutService,
        protected authService: AuthService,
        private router: Router
    ) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    login() {
        void this.authService.login();
    }

    logout() {
        void this.router.navigate(['']).then(() => this.authService.logout());
    }
}
