import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {MessageService} from "primeng/api";
import { RegisterComponent } from './register/register.component';
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {LoginComponent} from "./login/login.component";

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ButtonModule,
        ReactiveFormsModule,
        ToastModule,
        InputTextModule
    ],
    providers: [
        MessageService
    ],
    declarations: [
        RegisterComponent,
        LoginComponent
    ]
})
export class AuthModule { }
