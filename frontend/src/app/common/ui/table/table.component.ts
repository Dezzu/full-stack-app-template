import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, DecimalPipe, NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import { TemplateDirective } from '@/directives/template.directive';
import { DuiTablelazyLoadEvent, TableAction, TableColumn } from '@/common/model/base.model';
import { PageRequest } from '@/common/model/common';
import { Button } from 'primeng/button';
import { MultiSelect } from 'primeng/multiselect';
import { TextInputComponent } from '@/common/ui/input/text-input/text-input.component';
import { DynamicPipe } from '@/pipe/dynamic.pipe';

@Component({
    selector: 'dui-table',
    imports: [TableModule, FormsModule, NgTemplateOutlet, MultiSelect, Button, TextInputComponent, DynamicPipe],
    standalone: true,
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent<T> implements OnInit {
    @ViewChild('dt') dataTable: Table;

    @Input() cols?: TableColumn[];
    selectedColumns: TableColumn[] = [];
    @Input() lazy = true;
    @Input() rows: number = 10;
    @Input() simpleTable = false;
    @Input() rowsPerPageOptions = [5, 10, 20, 30];
    @Input() paginator = true;
    @Input() items: T[] = [];
    @Input() loading = false;
    @Input() totalRecords = 0;
    @Input() actions: TableAction<T>[] = [];
    @Input() expandable = false;
    @Input() dataKey: string | undefined = undefined;
    @Input() title: string | undefined = undefined;
    @Input() showAddButton = true;
    @Input() showSearch = true;
    @Input() showColumnSelector = true;

    @Output() onLazyLoad = new EventEmitter<DuiTablelazyLoadEvent>();
    @Output() openNew = new EventEmitter<void>();

    @ContentChildren(TemplateDirective)
    templates!: QueryList<TemplateDirective>;

    lastEvent: TableLazyLoadEvent | undefined = undefined;

    constructor() {}

    private pipeMap = {
        date: DatePipe,
        decimal: DecimalPipe,
        currency: CurrencyPipe,
        uppercase: UpperCasePipe
    };

    ngOnInit() {
        this.selectedColumns =
            this.getRemovableColumns().filter((col) => col.defaultRemoved == undefined || !col.defaultRemoved) ?? [];
    }

    getTemplateByName(name: string) {
        return this.templates.find((t) => t.name === name)?.template ?? null;
    }

    loadItems(event: TableLazyLoadEvent) {
        this.lastEvent = event;
        //TODO in caso io volessi usare un sortField custom andare ad aggiungere un campo sortField nella TabelColumn e usare quella passandola al BE per filtrare
        let pageRequest: PageRequest = {
            size: event.rows!,
            page: event.first! / event.rows!,
            sortField: event.sortField,
            sortOrder: event.sortOrder,
            query: event.globalFilter
        };
        this.onLazyLoad.emit({ ...event, pageRequest });
    }

    getColspan() {
        return this.cols?.length + (this.actions ? 1 : 0) + (this.expandable ? 1 : 0);
    }

    getRemovableColumns() {
        return this.cols.filter((col) => col.removable == undefined || col.removable);
    }

    getColumnToShow(): TableColumn[] {
        return this.cols.filter(
            (col) => (col.removable != null && !col.removable) || this.selectedColumns.includes(col)
        );
    }

    getPipeToken(pipeName?: string): any {
        return pipeName ? this.pipeMap[pipeName] : null;
    }

    getFieldValue(rowData: T, field: string): any {
        const split = field.split('.');
        if (!split) return rowData[field];

        let value = rowData;
        for (let i = 0; i < split.length; i++) {
            value = value[split[i]];
            if (value == undefined) return null;
        }
        return value;
    }
}
