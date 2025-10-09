import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LandingTopbar } from './landing.topbar';

@Component({
    selector: 'app-landing-layout',
    standalone: true,
    imports: [CommonModule, LandingTopbar, RouterModule],
    template: `<div class="layout-wrapper">
        <app-landing-topbar></app-landing-topbar>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-outlet></router-outlet>
            </div>
            <!--            <app-footer></app-footer>-->
        </div>
        <div class="layout-mask"></div>
    </div> `
})
export class LandingLayout {
    @ViewChild(LandingTopbar) appTopBar!: LandingTopbar;

    constructor(public router: Router) {}
}
