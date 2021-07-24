import React, {FC} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Container from '../Container/Container';
import Main from '../../pages/Main/Main';
import Game from '../../pages/Game/Game';

const App: FC = () => (
    <Container>
    <Router>
        <Switch>
            <Route path="/play" component={Game} />
            <Route path="*" component={Main} />
        </Switch>
    </Router>
    </Container>
)


export default App;
