import {
  Avatar,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { Dispatch, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveUser, updateUser } from '../../store/actions/user.actions';
import { UsersActions, TUser, TUserNew } from '../../store/types/user.types';
import UsersModal from './UserModal';
import UsersTable from './UsersTable';
import { orange } from '@material-ui/core/colors';
import useFilter from '../../hooks/useFilter';
import useUsers from './useUsers';

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
    filters: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(2),
    },
    rounded: {
      borderRadius: '25px',
    },
    roundedButton: {
      borderRadius: '25px',
      backgroundColor: orange[400],
      padding: '5px 25px',
    },
  })
);

export default function Users() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalValues, setModalValues] = useState<TUser>();
  const users = useUsers();
  const { filterValue, setFilterValue, filteredData } = useFilter<TUser>(users);
  const classes = useStyles();

  const dispatch = useDispatch<Dispatch<UsersActions>>();

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

  return (
    <div>
      <div className="inline space-btw align-cnt">
        <div className={classes.root}>
          <Avatar className={classes.orange}></Avatar>
          <Typography variant="h4">Members</Typography>
        </div>
        <div className={classes.filters}>
          <TextField
            variant="outlined"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="Search..."
            InputProps={{
              className: classes.rounded,
            }}
            size="small"
          />
          <Button
            className={classes.roundedButton}
            type="button"
            onClick={() => setIsOpen(true)}
            size="small"
          >
            Add User
          </Button>
        </div>
      </div>
      <UsersTable onEditClick={handleEditItemClick} users={filteredData} />
      <UsersModal
        isOpen={modalIsOpen}
        handleClose={handleClose}
        handleSave={handleSave}
        defaultValues={modalValues}
      />
    </div>
  );
}
