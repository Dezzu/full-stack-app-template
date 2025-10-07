import { Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Commessa, StatoCommessa } from '@/service/model/commesse';
import { Cliente } from '../../../service/model/cliente';
import { AppPage, PageRequest } from '@/service/model/common';
import { CommessaService } from '@/service/commessa.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '@/service/auth.service';
import { Toast } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '@/common/ui/table/table.component';
import { TableAction, TableColumn } from '@/common/auth/model/base.model';

@Component({
    selector: 'app-commesse-dashboard',
    imports: [Toast, TableModule, FormsModule, ReactiveFormsModule, TableComponent],
    templateUrl: './commesse-dashboard.component.html',
    styleUrls: ['./commesse-dashboard.component.scss']
})
export class CommesseDashboardComponent implements OnInit {
    lastEvent: TableLazyLoadEvent;

    commesse: Commessa[] = [];

    appPage: AppPage;
    page: number = 0;
    selectedColumns: TableColumn[] = [
        { field: 'id', header: 'Id' },
        { field: 'nome', header: 'Nome' },
        { field: 'cliente.nome', header: 'Cliente' }
    ];

    commesseActions: TableAction<Cliente>[] = [
        {
            icon: 'pi pi-eye',
            severity: 'info',
            command: (commessa: Cliente, commesse: Cliente[]) => {
                this.navigateToDettaglio(commessa);
            }
        }
    ];

    constructor(
        private commessaService: CommessaService,
        private messageService: MessageService,
        private router: Router,
        public authService: AuthService
    ) {}

    ngOnInit() {}

    loadCommesse(event: TableLazyLoadEvent) {
        this.lastEvent = event;
        let pageRequest: PageRequest = {
            size: event.rows,
            page: event.first / event.rows,
            sortField: event.sortField,
            sortOrder: event.sortOrder,
            query: event.globalFilter
        };
        this.commessaService.getCommesse(pageRequest, StatoCommessa.IN_CORSO).subscribe({
            next: (res) => {
                this.appPage = res as AppPage;
                this.commesse = this.appPage.data.content;
            },
            error: (err) =>
                this.messageService.add({
                    severity: 'error',
                    summary: 'Errore',
                    detail: 'Errore nel caricamento...',
                    life: 3000
                })
        });
    }

    navigateToDettaglio(commessa: Commessa) {
        this.router.navigate([`/gestionale/commesse/${commessa.id}`]);
    }
}
