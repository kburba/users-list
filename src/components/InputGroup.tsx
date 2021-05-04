import React from 'react';
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form';
import classnames from 'classnames';

type Props = {
  param: string;
  title: string;
  errors: DeepMap<any, FieldError>;
  register: UseFormRegister<any>;
};

const InputGroup = ({ errors, param, title, register }: Props) => {
  return (
    <div className={classnames('inputGroup', { error: errors[param] })}>
      <label htmlFor={param}>{title}</label>
      <input
        type="text"
        placeholder={`Enter ${title.toLowerCase()}...`}
        {...register(param)}
      />
      {errors[param] && <div className="errorMsg">{errors[param].message}</div>}
    </div>
  );
};
export default InputGroup;
