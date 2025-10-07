import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '@/service/auth.service';
import { LoginRequest } from '@/service/model/common';
import { LayoutService } from '@/layout/service/layout.service';
import { Toast } from 'primeng/toast';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [Toast, ReactiveFormsModule, InputText, RouterLink, ButtonDirective],
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `
    ]
})
export class LoginComponent {
    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) {}

    login() {
        if (!this.loginForm.valid) {
            this.messageService.add({
                severity: 'info',
                summary: 'Attenzione',
                detail: 'Controlla le credenziali!',
                life: 3000
            });
            return;
        }
        const request: LoginRequest = {
            username: this.loginForm.getRawValue().username,
            password: this.loginForm.getRawValue().password
        };
        this.authService.loginCall(request).subscribe({
            next: (res) => {
                this.authService.setSession(res.data.accessToken, res.data.refreshToken);
                this.router.navigate(['/gestionale']);
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Errore',
                    detail: 'Credenziali non corrette',
                    life: 3000
                });
            }
        });
    }
}
