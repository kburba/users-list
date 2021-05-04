import { takeLatest, put, call } from 'redux-saga/effects';
import {
  deleteUserSuccess,
  getUsersSuccess,
  saveUsersSuccess,
  updateUserSuccess,
} from '../actions/user.actions';
import { USER_ACTIONS } from '../actions/types';
import { DeleteUser, SaveUser, UpdateUser } from '../types/user.types';
import { v4 as uuidv4 } from 'uuid';

export function* updateUserSaga({ payload }: UpdateUser) {
  try {
    yield put(updateUserSuccess(payload));
  } catch (error) {
    console.error(error.message);
  }
}

export function* deleteUsersSaga({ payload }: DeleteUser) {
  try {
    yield put(deleteUserSuccess(payload));
  } catch (error) {
    console.error(error.message);
  }
}

export function* saveUserSaga({ payload }: SaveUser) {
  try {
    const newUser = { ...payload, id: uuidv4() };
    yield put(saveUsersSuccess(newUser));
  } catch (error) {
    console.error(error.message);
  }
}

export function* getUsersSaga() {
  try {
    const response = yield call(
      fetch,
      'https://jsonplaceholder.typicode.com/users'
    );
    const json = yield call([response, 'json']);
    yield put(getUsersSuccess(json));
  } catch (error) {
    console.error(error.message);
  }
}

export default function* watchUsersSaga() {
  yield takeLatest(USER_ACTIONS.DELETE, deleteUsersSaga);
  yield takeLatest(USER_ACTIONS.GET, getUsersSaga);
  yield takeLatest(USER_ACTIONS.SAVE, saveUserSaga);
  yield takeLatest(USER_ACTIONS.UPDATE, updateUserSaga);
}
