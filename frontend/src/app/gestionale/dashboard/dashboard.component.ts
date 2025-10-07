import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    templateUrl: './dashboard.component.html',
    imports: [TableModule, FormsModule, ReactiveFormsModule]
})
export class DashboardComponent {
    constructor() {}
}
