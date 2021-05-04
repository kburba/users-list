import React from 'react';
import Modal from 'react-modal';
import { TUser, TUserNew } from '../../store/types/user.types';
import UserForm from './UserForm';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: (client: TUserNew) => void;
  defaultValues?: TUser;
  handleClose: () => void;
};

export default function UsersModal({
  isOpen,
  setIsOpen,
  handleSave,
  defaultValues,
  handleClose,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Example Modal"
      className="kbmodal"
    >
      <UserForm
        handleClose={handleClose}
        onSave={handleSave}
        defaultValues={defaultValues}
      />
    </Modal>
  );
}
