import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancer,
  Store,
} from 'redux';
import { createBrowserHistory, History } from 'history';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas/root.saga';

import monitorReducersEnhancer from './monitorReducer';
import loggerMiddleware from './logger';
import createRootReducer from './reducers';
import { routerMiddleware } from 'connected-react-router';

export const history: History = createBrowserHistory();
const rootReducer = createRootReducer(history);
export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(): Store {
  const middlewares = [
    loggerMiddleware,
    sagaMiddleware,
    routerMiddleware(history),
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composeEnhancers =
    (window as Window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composedEnhancers: StoreEnhancer = composeEnhancers(...enhancers);

  const store = createStore(rootReducer, {}, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  sagaMiddleware.run(sagas);

  return store;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
