import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@/service/dashboard.service';

@Component({
    templateUrl: './dashboard.component.html',
    imports: []
})
export class DashboardComponent implements OnInit {
    constructor(private dashboardService: DashboardService) {}

    ngOnInit() {
        this.dashboardService.testCall().subscribe((data) => console.log(data));
    }
}
