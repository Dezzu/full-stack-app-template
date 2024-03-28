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
        totalPages: number
    };
    message: string;
    messageCode: string;
    success: boolean;
}

export interface PageRequest {
    size: number;
    page: number;
    sortOrder?: number;
    sortField?: string | string[];
    query?: string | string[]
}

export interface BaseRespose<T> {
    message: string;
    messageCode: string;
    success: boolean;
    data: T;
}

export interface Column {
    field: string;
    header: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegistrationRequest {
    name: string;
    username: string;
    password: string;
    role?: any
}

export interface ExpandedRows {
    [key: string]: boolean;
}
