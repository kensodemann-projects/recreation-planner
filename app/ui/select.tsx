import { CommonData } from '@/models/common-data';
import { ChangeEventHandler, ComponentPropsWithoutRef, FocusEventHandler } from 'react';

interface SelectProperties extends ComponentPropsWithoutRef<'select'> {
  id: string;
  label: string;
  value: string | number | undefined;
  values: Array<CommonData>;
  className?: string | undefined;
  error?: string | undefined;
  onBlur?: FocusEventHandler<HTMLSelectElement> | undefined;
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
}

const Select = ({ id, label, value, values, className, error, onBlur, onChange, ...props }: SelectProperties) => {
  return (
    <label className={`form-control w-full ${className}`}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        id={id}
        className={`select select-bordered ${error ? ' select-error' : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      >
        {values.map((type) => (
          <option value={type.id} key={type.id}>
            {type.name}
          </option>
        ))}
      </select>
      {error ? <div className="label-text-alt text-error">{error}</div> : <div className="label-text-alt">&nbsp;</div>}
    </label>
  );
};

export default Select;
