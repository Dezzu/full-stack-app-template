import { Component, OnInit } from '@angular/core';
import { CategorieService } from '@/service/categorie.service';
import { ValoriCategorie } from '@/service/model/categoria';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonComponent } from '@/common/ui/skeleton/skeleton.component';
import { NgForOf, NgIf, NgStyle } from '@angular/common';

@Component({
    selector: 'app-valori-categorie-dashboard',
    imports: [TableModule, FormsModule, ReactiveFormsModule, SkeletonComponent, NgStyle, NgForOf, NgIf, NgForOf, NgIf],

    templateUrl: './valori-categorie-dashboard.component.html',
    styleUrls: ['./valori-categorie-dashboard.component.scss']
})
export class ValoriCategorieDashboardComponent implements OnInit {
    valori: ValoriCategorie;
    loading = true;

    colors = [
        'orange-500',
        'cyan-500',
        'pink-500',
        'green-500',
        'purple-500',
        'teal-500',
        'red-500',
        'blue-500',
        'yellow-500',
        'indigo-500'
    ];

    constructor(
        private categoriaService: CategorieService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.categoriaService.getValori().subscribe({
            next: (res) => {
                this.valori = res.data;
                this.loading = false;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Errore',
                    detail: 'Errore nel caricamento...',
                    life: 3000
                });
                this.loading = false;
            }
        });
    }

    getPercentage(valore: number) {
        return valore.toFixed(1) + '%';
    }

    classeRiga(percentage: number) {
        return 'bg-' + this.classeFromPercentage(percentage);
    }

    classeNumero(percentage: number) {
        return 'text-' + this.classeFromPercentage(percentage);
    }

    classeFromPercentage(percentage: number): string {
        const number = Math.floor(percentage / 10) + 1;
        return this.colors[number > 5 ? number - 5 : number];
    }
}
