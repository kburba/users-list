import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import TableMUI, { TableColumn } from '../../components/TableMaterial/TableMUI';
import { deleteUser } from '../../store/actions/user.actions';
import { UsersActions, TUser } from '../../store/types/user.types';

type Props = {
  users: TUser[];
  onEditClick: (item: TUser) => void;
};

export default function UsersTable({ users, onEditClick }: Props) {
  const dispatch = useDispatch<Dispatch<UsersActions>>();

  return (
    <div>
      <TableMUI data={users} columns={TABLE_COLUMNS} />
    </div>
  );
}

const TABLE_COLUMNS: TableColumn[] = [
  {
    title: 'Name',
    id: 'name',
    linkToPrefix: '/members',
    linkToKey: 'id',
  },
  {
    title: 'Email',
    id: 'email',
  },
  {
    title: 'Phone',
    id: 'phone',
  },
  {
    title: 'Website',
    id: 'website',
  },
];
