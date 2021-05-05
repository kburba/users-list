import React from 'react';
import Users from './containers/users/Users';
import './styles/_index.scss';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Route, Switch } from 'react-router';
import { history } from './store/configureStore';

import { Container, CssBaseline } from '@material-ui/core';
import 'typeface-roboto';
import TopBar from './components/Layout/TopBar';

function App() {
  return (
    <ConnectedRouter history={history}>
      <CssBaseline />
      <Container fixed>
        <TopBar />
        <Switch>
          <Route path="/members" component={Users} />
          <Route path="/" component={Users} exact />
          <Route component={() => <div>Route Not Found</div>} />
        </Switch>
      </Container>
    </ConnectedRouter>
  );
}

export default App;
