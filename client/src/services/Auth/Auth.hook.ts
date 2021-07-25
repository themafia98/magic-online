import {useContext} from 'react';
import {AuthContextActions, AuthContextState} from './Auth.context';


export const useAuthState = () => useContext(AuthContextState);

export const useAuthActions = () => useContext(AuthContextActions);
