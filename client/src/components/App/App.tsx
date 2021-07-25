import React, {FC} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Container from '../Container/Container';
import Main from '../../pages/Main/Main';
import Game from '../../pages/Game/Game';
import PrivateRoute from '../helpers/PrivateRoute';

const App: FC = () => (
    <Container>
    <Router>
        <Switch>
            <PrivateRoute path="/play" component={Game} />
            <Route path="*" component={Main} />
        </Switch>
    </Router>
    </Container>
)

export default App;