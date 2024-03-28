import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BaseRespose, LoginRequest, PageRequest, RegistrationRequest} from "./model/common";
import {AppUser, LoginResponse} from "./model/auth";
import {Router} from "@angular/router";
import {AppToken, Role} from "./model/token";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl = environment.baseUrl;

    constructor(private jwtHelper: JwtHelperService, private http: HttpClient, private router : Router) {
    }

    public isAdmin() {
        return (this.jwtHelper.decodeToken(this.getToken()) as AppToken)?.role === Role.ADMIN
    }

    public getUser() : AppUser {
        const token = this.jwtHelper.decodeToken() as AppToken;
        return {
            id: token.userId,
            role: token.role
        }
    }
    public getToken() {
        return localStorage.getItem("access_token")
    }

    public isAuthenticated(): boolean {
        return !this.jwtHelper.isTokenExpired(this.getToken());
    }

    public loginCall(request: LoginRequest) {
        return this.http.post<BaseRespose<LoginResponse>>(`${this.baseUrl}/v1/authenticate/login`, request)
    }

    public registerCall(request: RegistrationRequest) {
        return this.http.post<BaseRespose<LoginResponse>>(`${this.baseUrl}/v1/authenticate/register`, request)
    }

    public setSession(accessToken: string, refreshToken: string) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
    }

    public logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    public getUtenti(request : PageRequest) {
        let params = `page=${request.page}&size=${request.size}`;
        if(request.sortField) params += `&sortField=${request.sortField}`
        if(request.sortOrder) params += `&sortOrder=${request.sortOrder}`
        if(request.query) params += `&query=${request.query}`
        return this.http.get<any>(`${this.baseUrl}/v1/utenti?${params}`);
    }

    public updateUtente(utente: RegistrationRequest, id: number) {
        return this.http.put<any>(`${this.baseUrl}/v1/utenti/${id}`, utente);
    }

    public getRuoli() {
        return this.http.get<any>(`${this.baseUrl}/v1/utenti/ruoli`)
    }
}
