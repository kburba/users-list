import { createStyles, makeStyles, Modal, Theme } from '@material-ui/core';
import React from 'react';
import { TUser, TUserNew } from '../../store/types/user.types';
import UserForm from './UserForm';

type Props = {
  isOpen: boolean;
  handleSave: (client: TUserNew) => void;
  defaultValues?: TUser;
  handleClose: () => void;
};

export default function UsersModal({
  isOpen,
  handleSave,
  defaultValues,
  handleClose,
}: Props) {
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <UserForm
          handleClose={handleClose}
          onSave={handleSave}
          defaultValues={defaultValues}
        />
      </div>
    </Modal>
  );
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: 'none',
    },
  })
);
