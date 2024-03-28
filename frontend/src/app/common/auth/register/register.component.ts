import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LayoutService} from "../../../layout/service/app.layout.service";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RegistrationRequest} from "../../../service/model/common";
import {Routes} from "../../../constant/routes";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    registerForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
    });

    routes = Routes;


    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router, private messageService: MessageService) { }

    register() {
        if(!this.registerForm.valid || this.registerForm.getRawValue().password !== this.registerForm.getRawValue().confirmPassword) {
            this.messageService.add({ severity: 'info', summary: 'Attenzione', detail: "Controlla i dati inseriti!", life: 3000 })
            return
        }
        const request: RegistrationRequest = {
            name: this.registerForm.getRawValue().name,
            username: this.registerForm.getRawValue().username,
            password: this.registerForm.getRawValue().password,
        }
        this.authService.registerCall(request).subscribe({
            next: res => {
                this.router.navigate([Routes.LOGIN])
            },
            error: err => {
                this.messageService.add({ severity: 'error', summary: 'Errore', detail: "Credenziali non corrette", life: 3000 })
            }
        });
    }

}
