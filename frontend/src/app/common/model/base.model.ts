import { TableLazyLoadEvent } from 'primeng/table';
import { ButtonSeverity } from 'primeng/button';

export interface TableColumn {
    field: string;
    header: string;
    sortable?: boolean;
    removable?: boolean;
    defaultRemoved?: boolean;
    suffix?: string;
    pipe?: string;
    pipeArgs?: any[];
}

export interface TableAction<T> {
    icon: string | ((row: T, rows: T[]) => string);
    class?: string;
    severity?: ButtonSeverity;
    command: (row: T, rows: T[]) => void;
    disabled?: (row: T, rows: T[]) => boolean;
    visible?: (row: T, rows: T[]) => boolean;
    tooltip?: string;
}

export interface PageRequest {
    size: number;
    page: number;
    sortOrder?: number | null;
    sortField?: string | string[] | null;
    query?: string | string[] | null;
}

export interface DuiTablelazyLoadEvent extends TableLazyLoadEvent {
    pageRequest: PageRequest;
}

export interface AppPage {
    data: {
        content: any;
        first: boolean;
        empty: boolean;
        last: boolean;
        number: number;
        numberOfElements: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
    message: string;
    messageCode: string;
    success: boolean;
}
