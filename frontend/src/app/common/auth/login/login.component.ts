import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {FormControl, FormGroup, Validators,} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../service/auth.service";
import {LoginRequest} from "../../../service/model/common";
import {Routes} from "../../../constant/routes";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });
    routes = Routes;


    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router, private messageService: MessageService) { }

    login() {
        if(!this.loginForm.valid) {
            this.messageService.add({ severity: 'info', summary: 'Attenzione', detail: "Controlla le credenziali!", life: 3000 })
            return
        }
        const request: LoginRequest = {
            username: this.loginForm.getRawValue().username,
            password: this.loginForm.getRawValue().password,
        }
        this.authService.loginCall(request).subscribe({
            next: res => {
                this.authService.setSession(res.data.accessToken, res.data.refreshToken)
                this.router.navigate([Routes.HOME])
            },
            error: err => {
                this.messageService.add({ severity: 'error', summary: 'Errore', detail: "Credenziali non corrette", life: 3000 })
            }
        });
    }
}
