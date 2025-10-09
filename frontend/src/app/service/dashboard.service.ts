import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    testCall() {
        return this.http.get(this.baseUrl + '/v1/recipes');
    }
}
