export interface LoginResponse {
    accessToken: string,
    refreshToken: string,
}

export interface AppUser {
    id?: number;
    name?: string;
    username?: string;
    role: any;
}
