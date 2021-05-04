import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import Table from '../../components/Table/Table';
import {
  TableAction,
  TableButtonTypes,
  TableColumn,
} from '../../components/Table/table.types';
import { deleteUser } from '../../store/actions/user.actions';
import { UsersActions, TUser } from '../../store/types/user.types';

type Props = {
  users: TUser[];
  onEditClick: (item: TUser) => void;
};

export default function UsersTable({ users, onEditClick }: Props) {
  const dispatch = useDispatch<Dispatch<UsersActions>>();

  const TABLE_ACTIONS: TableAction[] = [
    {
      action: (item: TUser) => {
        console.log('edit', item);
        onEditClick(item);
      },
      key: TableButtonTypes.EDIT,
    },
    {
      action: (item: TUser) => {
        console.log('delete', item);
        dispatch(deleteUser(item.id));
      },
      key: TableButtonTypes.DELETE,
    },
  ];
  return (
    <div>
      <Table actions={TABLE_ACTIONS} data={users} columns={TABLE_COLUMNS} />
    </div>
  );
}

const TABLE_COLUMNS: TableColumn[] = [
  {
    title: 'First',
    valueKey: 'name',
  },
  {
    title: 'Last',
    valueKey: 'email',
  },
  {
    title: 'Phone',
    valueKey: 'phone',
  },
  {
    title: 'Address',
    valueKey: 'website',
  },
  {
    title: 'Action',
    valueKey: '',
    type: 'buttons',
    buttons: [TableButtonTypes.EDIT, TableButtonTypes.DELETE],
  },
];
