import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { NgForOf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { Chip } from 'primeng/chip';
import { AuthService } from '@/common/services/auth.service';
import { Router } from '@angular/router';
import { DashboardService } from '@/service/dashboard.service';

@Component({
    selector: 'app-landing-home',
    imports: [Button, Card, NgForOf, PrimeTemplate, Chip],
    templateUrl: './landing-home.component.html',
    styleUrl: './landing-home.component.scss'
})
export class LandingHomeComponent {
    features = [
        {
            title: 'Aggiungi Manualmente',
            description:
                'Crea le tue ricette inserendo ingredienti, procedimento e foto. Organizza tutto in un unico posto.',
            icon: 'pi-pencil',
            color: '#00C853'
        },
        {
            title: 'Genera con AI',
            description:
                "L'intelligenza artificiale ti suggerisce ricette basate sugli ingredienti che hai a disposizione.",
            icon: 'pi-sparkles',
            color: '#FF6D00'
        },
        {
            title: 'Organizza Collezioni',
            description: 'Raggruppa le ricette per categorie: antipasti, primi, dolci e molto altro.',
            icon: 'pi-folder',
            color: '#2979FF'
        },
        {
            title: 'Condividi',
            description: 'Condividi le tue ricette preferite con amici e famiglia in un click.',
            icon: 'pi-share-alt',
            color: '#AA00FF'
        }
    ];

    constructor(protected authService: AuthService) {}

    handleStart() {
        this.authService.login('r');
    }
}
