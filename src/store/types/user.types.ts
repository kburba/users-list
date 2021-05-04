import { USER_ACTIONS } from '../actions/types';

export type UsersState = {
  users: TUser[];
};

export type UsersActions =
  | GetUsers
  | GetUsersSuccess
  | SaveUser
  | SaveUserSuccess
  | DeleteUser
  | DeleteUserSuccess
  | UpdateUser
  | UpdateUserSuccess;

export interface UpdateUser {
  type: typeof USER_ACTIONS.UPDATE;
  payload: TUser;
}
export interface UpdateUserSuccess {
  type: typeof USER_ACTIONS.UPDATE_SUCCESS;
  payload: TUser;
}

export interface DeleteUser {
  type: typeof USER_ACTIONS.DELETE;
  payload: string;
}

export interface DeleteUserSuccess {
  type: typeof USER_ACTIONS.DELETE_SUCCESS;
  payload: string;
}
export interface SaveUser {
  type: typeof USER_ACTIONS.SAVE;
  payload: TUserNew;
}

export interface SaveUserSuccess {
  type: typeof USER_ACTIONS.SAVE_SUCCESS;
  payload: TUser;
}

export interface GetUsers {
  type: typeof USER_ACTIONS.GET;
}

export interface GetUsersSuccess {
  type: typeof USER_ACTIONS.GET_SUCCESS;
  payload: TUser[];
}

export type TUser = {
  name: string;
  email: string;
  phone: string;
  website: string;
  id: string;
};

export type TUserNew = Omit<TUser, 'id'>;
