import React,{FC} from 'react';
import {Route, RouteProps, Redirect} from 'react-router-dom';
import {useAuthState} from '../../services/Auth/Auth.hook';

const PrivateRoute: FC<RouteProps> = ({
    children,
    ...props
}) => {
    const { user } = useAuthState();

        if (user === null) {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <Route {...props}>
                {children}
            </Route>
        )
}

export default PrivateRoute;