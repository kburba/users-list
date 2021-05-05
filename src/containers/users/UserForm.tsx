import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import useYupValidationResolver from '../../hooks/useYupValidatorResolver';
import { TUserNew } from '../../store/types/user.types';
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { orange } from '@material-ui/core/colors';
import { capitalizeFirstLetter } from '../../components/Table/utils';

type Props = {
  onSave: (values: TUserNew) => void;
  defaultValues?: TUserNew;
  handleClose: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& >': {
        marginBottom: theme.spacing(3),
      },
    },
    roundedButton: {
      borderRadius: '25px',
      backgroundColor: orange[400],
      padding: '5px 25px',
    },
    alignRight: {
      textAlign: 'right',
    },
  })
);

export default function UserForm({
  handleClose,
  onSave,
  defaultValues,
}: Props) {
  const { t } = useTranslation();

  const classes = useStyles();

  const resolver = useYupValidationResolver(validationSchema);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserNew>({ resolver, defaultValues });

  const onSubmit = handleSubmit((data) => onSave(data));

  return (
    <form onSubmit={onSubmit} className={classes.root}>
      {USER_FIELDS.map((x) => (
        <Controller
          name={x}
          key={x}
          control={control}
          render={({ field }) => (
            <TextField
              placeholder={x}
              label={capitalizeFirstLetter(x)}
              margin="normal"
              error={errors && !!errors.name}
              helperText={errors && errors.name?.message}
              {...field}
            />
          )}
        />
      ))}

      <Box marginTop={3} className={classes.alignRight}>
        <Button
          className={classes.roundedButton}
          onClick={handleClose}
          type="button"
          size="small"
        >
          {t('Close')}
        </Button>
        <Button className={classes.roundedButton} type="submit" size="small">
          {t('Save')}
        </Button>
      </Box>
    </form>
  );
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  website: Yup.string().required('Required'),
});

const USER_FIELDS: (keyof TUserNew)[] = ['name', 'email', 'phone', 'website'];
