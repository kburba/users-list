import {
  DeleteUser,
  DeleteUserSuccess,
  GetUsers,
  GetUsersSuccess,
  SaveUser,
  SaveUserSuccess,
  TUser,
  TUserNew,
  UpdateUser,
  UpdateUserSuccess,
} from '../types/user.types';
import { USER_ACTIONS } from './types';

export function updateUser(user: TUser): UpdateUser {
  return {
    type: USER_ACTIONS.UPDATE,
    payload: user,
  };
}
export function updateUserSuccess(user: TUser): UpdateUserSuccess {
  return {
    type: USER_ACTIONS.UPDATE_SUCCESS,
    payload: user,
  };
}

export function deleteUser(id: string): DeleteUser {
  return {
    type: USER_ACTIONS.DELETE,
    payload: id,
  };
}
export function deleteUserSuccess(id: string): DeleteUserSuccess {
  return {
    type: USER_ACTIONS.DELETE_SUCCESS,
    payload: id,
  };
}

export function saveUser(user: TUserNew): SaveUser {
  return {
    type: USER_ACTIONS.SAVE,
    payload: user,
  };
}
export function saveUsersSuccess(user: TUser): SaveUserSuccess {
  return {
    type: USER_ACTIONS.SAVE_SUCCESS,
    payload: user,
  };
}

export function getUsers(): GetUsers {
  return {
    type: USER_ACTIONS.GET,
  };
}

export function getUsersSuccess(users: TUser[]): GetUsersSuccess {
  return {
    type: USER_ACTIONS.GET_SUCCESS,
    payload: users,
  };
}
