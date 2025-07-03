import { CommonData } from '@/models/common-data';
import { ChangeEventHandler, ComponentPropsWithoutRef, FocusEventHandler } from 'react';

interface SelectProperties extends ComponentPropsWithoutRef<'select'> {
  label: string;
  values: Array<CommonData>;
  error?: string | undefined;
}

const Select = ({ label, values, className, error, ...props }: SelectProperties) => {
  return (
    <div className={className}>
      <label className="select w-full">
        <span className="label">{label}</span>
        <select {...props} className={`select select-bordered ${error ? ' select-error' : ''}`}>
          {values.map((type) => (
            <option value={type.id} key={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </label>
      <div className="text-error text-sm pb-2">{error ? error : '\u00A0'}</div>
    </div>
  );
};

export default Select;
