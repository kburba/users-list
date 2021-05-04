import React from 'react';
import Users from './containers/users/Users';
import './styles/_index.scss';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Route, Switch } from 'react-router';
import { history } from './store/configureStore';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/" component={Users} exact />
        <Route component={() => <div>Route Not Found</div>} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
