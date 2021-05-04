/** rootSaga.js */
import { all, fork } from 'redux-saga/effects';
import watchUsersSaga from './users.saga';

// import watchers from other files
export default function* rootSaga() {
  yield all([fork(watchUsersSaga)]);
}
