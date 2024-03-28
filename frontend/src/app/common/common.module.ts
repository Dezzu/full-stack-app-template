import { NgModule } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { ConfirmDeleteDialogComponent } from './confirm-dialog/confirm-delete-dialog.component';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { SkeletonComponent } from './skeleton/skeleton.component';
import {SkeletonModule} from "primeng/skeleton";



@NgModule({
    declarations: [
        ConfirmDeleteDialogComponent,
        SkeletonComponent,
    ],
    exports: [
        ConfirmDeleteDialogComponent,
        SkeletonComponent,
    ],
    imports: [
        CommonModule,
        ButtonModule,
        DialogModule,
        NgIf,
        RippleModule,
        SharedModule,
        ToastModule,
        ReactiveFormsModule,
        RouterLink,
        SkeletonModule
    ]
})
export class CommonAppModule { }
