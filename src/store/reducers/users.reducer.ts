import { USER_ACTIONS } from '../actions/types';
import { UsersActions, UsersState } from '../types/user.types';

export const initialState: UsersState = {
  users: [],
};

const usersReducer = (
  state = initialState,
  action: UsersActions
): UsersState => {
  switch (action.type) {
    case USER_ACTIONS.UPDATE_SUCCESS: {
      const users = state.users.map((x) => {
        if (x.id === action.payload.id) {
          return { ...action.payload };
        }
        return x;
      });
      return {
        ...state,
        users,
      };
    }
    case USER_ACTIONS.DELETE_SUCCESS: {
      const users = state.users.filter((x) => x.id !== action.payload);
      return {
        ...state,
        users,
      };
    }
    case USER_ACTIONS.SAVE_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case USER_ACTIONS.GET_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
