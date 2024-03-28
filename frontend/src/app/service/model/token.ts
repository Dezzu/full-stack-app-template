export interface AppToken {
    userId?: number;
    role?: Role
}

export enum Role {
    UTENTE ="UTENTE", ADMIN="ADMIN"
}
