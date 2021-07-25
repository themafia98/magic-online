import {createContext, Dispatch} from 'react';

export interface User {
    user_id: string;
    user_type_id: string;
    username: string;
    name: string;
    email: string;
    password?: string;
}

export interface AuthActions {
    // eslint-disable-next-line no-unused-vars
    loadUser: (value: User) => void
};

export interface AuthState {
    user: User | null
};

export const initialState: AuthState = {
    user: null
};

export const AuthContextState = createContext<AuthState>(initialState);

export const AuthContextActions = createContext<Dispatch<any> | null>(null);