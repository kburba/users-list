import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import InputGroup from '../../components/InputGroup';
import useYupValidationResolver from '../../hooks/useYupValidatorResolver';
import { TUserNew } from '../../store/types/user.types';

type Props = {
  onSave: (values: TUserNew) => void;
  defaultValues?: TUserNew;
  handleClose: () => void;
};
export default function UserForm({
  handleClose,
  onSave,
  defaultValues,
}: Props) {
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserNew>({ resolver, defaultValues });

  const onSubmit = handleSubmit((data) => onSave(data));

  return (
    <form onSubmit={onSubmit}>
      <InputGroup
        param="name"
        title="Name"
        register={register}
        errors={errors}
      />
      <InputGroup
        param="email"
        title="Email"
        register={register}
        errors={errors}
      />
      <InputGroup
        param="phone"
        title="Phone"
        register={register}
        errors={errors}
      />
      <InputGroup
        param="website"
        title="Website"
        register={register}
        errors={errors}
      />
      <div className="inline text-right">
        <button type="button" className="kbbutton" onClick={handleClose}>
          Close
        </button>
        <button type="submit" className="kbbutton primary">
          Save
        </button>
      </div>
    </form>
  );
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  website: Yup.string().required('Required'),
});
