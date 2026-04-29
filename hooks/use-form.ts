import { useState } from 'react';

export type FieldConfig<T> = {
  initialValue: T;
  validate?: (val: T) => string | undefined;
  /** Override equality for isDirty. Defaults to trimmed string comparison for strings, === otherwise. */
  equals?: (current: T, initial: T) => boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SchemaBase = Record<string, FieldConfig<any>>;
type InferValue<C> = C extends FieldConfig<infer T> ? T : never;
type FormValues<S extends SchemaBase> = { [K in keyof S]: InferValue<S[K]> };
type FormErrors<S extends SchemaBase> = { [K in keyof S]?: string };

export type FieldState<T> = {
  value: T;
  error: string | undefined;
  setValue: (val: T) => void;
  validate: () => void;
};

export type FormFields<S extends SchemaBase> = { [K in keyof S]: FieldState<InferValue<S[K]>> };

const defaultEquals = <T>(current: T, initial: T): boolean => {
  if (typeof current === 'string' && typeof initial === 'string') {
    return current.trim() === initial.trim();
  }
  return current === initial;
};

export const useForm = <S extends SchemaBase>(schema: S) => {
  const [values, setValues] = useState<FormValues<S>>(() => {
    const init = {} as FormValues<S>;
    for (const key in schema) {
      (init as Record<string, unknown>)[key] = schema[key].initialValue;
    }
    return init;
  });

  const [errors, setErrors] = useState<FormErrors<S>>({} as FormErrors<S>);

  const fields = Object.keys(schema).reduce((acc, key) => {
    const k = key as keyof S;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc as Record<string, FieldState<any>>)[key] = {
      value: values[k],
      error: errors[k],
      setValue: (val: InferValue<S[typeof k]>) => {
        setValues((prev) => ({ ...prev, [k]: val }));
        const err = schema[k].validate ? schema[k].validate!(val) : undefined;
        setErrors((prev) => ({ ...prev, [k]: err }));
      },
      validate: () => {
        const err = schema[k].validate ? schema[k].validate!(values[k]) : undefined;
        setErrors((prev) => ({ ...prev, [k]: err }));
      },
    };
    return acc;
  }, {} as FormFields<S>);

  const isDirty = Object.keys(schema).some((key) => {
    const k = key as keyof S;
    const eq =
      (schema[k].equals as ((c: InferValue<S[typeof k]>, i: InferValue<S[typeof k]>) => boolean) | undefined) ??
      defaultEquals;
    return !eq(values[k], schema[k].initialValue as InferValue<S[typeof k]>);
  });

  const isValid = Object.keys(schema).every((key) => !errors[key as keyof S]);

  const validateAll = () => {
    const newErrors = {} as FormErrors<S>;
    for (const key in schema) {
      const k = key as keyof S;
      (newErrors as Record<string, string | undefined>)[key] = schema[k].validate
        ? schema[k].validate!(values[k])
        : undefined;
    }
    setErrors(newErrors);
  };

  const reset = () => {
    const init = {} as FormValues<S>;
    for (const key in schema) {
      (init as Record<string, unknown>)[key] = schema[key].initialValue;
    }
    setValues(init);
    setErrors({} as FormErrors<S>);
  };

  return { fields, isDirty, isValid, validateAll, reset };
};
