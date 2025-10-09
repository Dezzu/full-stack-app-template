import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LandingTopbar } from './landing.topbar';

@Component({
    selector: 'app-landing-layout',
    standalone: true,
    imports: [CommonModule, LandingTopbar, RouterModule],
    template: ` <app-landing-topbar></app-landing-topbar>
        <router-outlet></router-outlet>`,
    styles: [
        `
            :host {
                display: block;
                min-height: 100vh;
                background-color: #f5f5f5;
            }
        `
    ]
})
export class LandingLayout {
    @ViewChild(LandingTopbar) appTopBar!: LandingTopbar;

    constructor(public router: Router) {}
}
