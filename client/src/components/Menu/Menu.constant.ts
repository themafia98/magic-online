
export type menuType = 'public' | 'private';

export interface IMenuConfig {
    id: number;
    name: string;
    to: string;
}

export const MENU_TYPE: Readonly<Record<string, menuType>> = {
    PUBLIC: 'public',
    PRIVATE: 'private'
}

export const publicMenu: Readonly<Array<IMenuConfig>> = [
    {
        id: 1,
        name: 'Connect',
        to: '/play'
    },
    {
        id: 2,
        name: 'Create new account',
        to: '/registration'
    }
]