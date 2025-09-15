import './commands';

export interface User {
    full_name: string;
    email: string;
    password: string;
    id?: string;
}