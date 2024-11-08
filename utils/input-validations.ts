export const isRequired = (value: string | undefined | null, label?: string | undefined): string => {
  return (value || '').trim().length > 0 ? '' : `${label || 'Value'} is required`;
};

export const isEmail = (value: string | undefined | null): string => {
  const res =
    /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/.test(
      value || '',
    );
  return res ? '' : 'Please enter a valid email address.';
};
