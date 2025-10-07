import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegistrationRequest } from '@/service/model/common';
import { LayoutService } from '@/layout/service/layout.service';
import { InputText } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    imports: [ReactiveFormsModule, InputText, Toast, RouterLink],
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    registerForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required])
    });

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) {}

    register() {
        if (
            !this.registerForm.valid ||
            this.registerForm.getRawValue().password !== this.registerForm.getRawValue().confirmPassword
        ) {
            this.messageService.add({
                severity: 'info',
                summary: 'Attenzione',
                detail: 'Controlla i dati inseriti!',
                life: 3000
            });
            return;
        }
        const request: RegistrationRequest = {
            name: this.registerForm.getRawValue().name,
            username: this.registerForm.getRawValue().username,
            password: this.registerForm.getRawValue().password
        };
        this.authService.registerCall(request).subscribe({
            next: (res) => {
                this.router.navigate(['/auth/login']);
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
