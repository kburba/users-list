import { combineReducers } from 'redux';
import usersReducer from './users.reducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    usersReducer,
  });

export default createRootReducer;
