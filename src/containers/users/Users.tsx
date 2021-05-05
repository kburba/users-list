import {
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsers,
  saveUser,
  updateUser,
} from '../../store/actions/user.actions';
import { RootState } from '../../store/configureStore';
import {
  UsersActions,
  UsersState,
  TUser,
  TUserNew,
} from '../../store/types/user.types';
import UsersModal from './UserModal';
import UsersTable from './UsersTable';
import { orange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: orange[400],
      backgroundColor: orange[400],
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

export default function Users() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalValues, setModalValues] = useState<TUser>();
  const classes = useStyles();

  const dispatch = useDispatch<Dispatch<UsersActions>>();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  function handleEditItemClick(item: TUser) {
    setModalValues(item);
    setIsOpen(true);
  }

  function handleSave(client: TUserNew | TUser) {
    if ('id' in client) {
      dispatch(updateUser(client));
    } else {
      dispatch(saveUser(client));
    }
    handleClose();
  }

  function handleClose() {
    setModalValues(undefined);
    setIsOpen(false);
  }

  const { users } = useSelector<
    RootState,
    {
      users: UsersState['users'];
    }
  >(({ usersReducer }) => ({
    users: usersReducer.users,
  }));

  return (
    <div>
      <div className="inline space-btw align-cnt">
        <div className={classes.root}>
          <Avatar className={classes.orange}></Avatar>
          <Typography variant="h4">Members</Typography>
        </div>
        <button
          type="button"
          className="kbbutton primary"
          onClick={() => setIsOpen(true)}
        >
          Add User
        </button>
      </div>
      {users.length > 0 && (
        <UsersTable onEditClick={handleEditItemClick} users={users} />
      )}
      <UsersModal
        isOpen={modalIsOpen}
        handleClose={handleClose}
        handleSave={handleSave}
        defaultValues={modalValues}
      />
    </div>
  );
}
