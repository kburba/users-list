import { Dispatch, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../store/actions/user.actions';
import { UsersActions, UsersState } from '../../store/types/user.types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';

const useUsers = () => {
  const dispatch = useDispatch<Dispatch<UsersActions>>();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { users } = useSelector<
    RootState,
    {
      users: UsersState['users'];
    }
  >(({ usersReducer }) => ({
    users: usersReducer.users,
  }));

  return users;
};
export default useUsers;
