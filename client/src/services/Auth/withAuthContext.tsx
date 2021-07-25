import {FC, useReducer} from 'react';
import {AuthContextActions, AuthContextState, AuthState, initialState} from './Auth.context';
import {LOAD_USER, PayloadAction} from './Auth.actions';

// eslint-disable-next-line no-unused-vars
type AuthReducer = (state: AuthState, action: PayloadAction) => AuthState;

const reducer: AuthReducer = (state: AuthState, action: PayloadAction) => {
    switch (action.type) {
        case LOAD_USER:
            return {
                user: action.payload
            }
        default:
            throw new Error('invalid auth action');
    }
};

const withAuthContext = (Component: FC<any>) => {
    const WithAuthContextComponent: FC<any> = (props: Record<string, any>) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        return (
            <AuthContextState.Provider value={state}>
                <AuthContextActions.Provider value={dispatch}>
                    <Component {...props} />
                </AuthContextActions.Provider>
            </AuthContextState.Provider>
        )
    }

    WithAuthContextComponent.displayName = 'WithAuthContext';

    return WithAuthContextComponent;
};

export default withAuthContext;