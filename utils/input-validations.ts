export const isRequired = (value: string | number | undefined | null, label?: string | undefined): string => {
  return (value ?? '').toString().trim().length > 0 ? '' : `${label || 'Value'} is required`;
};

export const isEmail = (value: string | undefined | null): string => {
  if (!value) {
    return '';
  }
  const res =
    /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/.test(
      value || '',
    );
  return res ? '' : 'Please enter a valid email address.';
};

export const isHttpUrl = (value: string | undefined | null): string => {
  if (!value) {
    return '';
  }
  try {
    const url = new URL(value || '');
    return url.protocol === 'http:' || url.protocol === 'https:' ? '' : 'Please enter a valid URL.';
  } catch {
    return 'Please enter a valid URL.';
  }
};
