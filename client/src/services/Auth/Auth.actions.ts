import {User} from './Auth.context';

export interface PayloadAction<T = any> {
    type: string;
    payload: T;
};

export const LOAD_USER: Readonly<string> = 'AuthContext/loadUser';

export const loadUser = (value: User): PayloadAction<User> => ({
    type: LOAD_USER,
    payload: value
});