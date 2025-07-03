import { describe, expect, it } from 'vitest';
import { useFormControl } from '../use-form-control';
import { act, renderHook } from '@testing-library/react';

describe('Form Control Hook', () => {
  describe('without an undefined initial value', () => {
    it('starts with an empty value', () => {
      const { result } = renderHook(() =>
        useFormControl<string>(undefined, (v: string | undefined) => (v ? '' : 'The value is in error')),
      );
      expect(result.current.value).toBeUndefined();
    });

    it('has no errors', () => {
      const { result } = renderHook(() =>
        useFormControl<string>(undefined, (v: string | undefined) => (v ? '' : 'The value is in error')),
      );
      expect(result.current.error).toBeUndefined();
    });

    describe('validate', () => {
      it('sets the error message if the data is invalid', () => {
        const { result } = renderHook(() =>
          useFormControl<string>(undefined, (v: string | undefined) => (v ? '' : 'The value is in error')),
        );
        expect(result.current.error).toBeFalsy();
        act(() => result.current.validate());
        expect(result.current.error).toBe('The value is in error');
      });

      it('does not set the error message if the data is valid', () => {
        const { result } = renderHook(() =>
          useFormControl<string>('good data', (v: string | undefined) => (v ? '' : 'The value is in error')),
        );
        expect(result.current.error).toBeFalsy();
        act(() => result.current.validate());
        expect(result.current.error).toBeFalsy();
      });
    });

    describe('set value', () => {
      it('runs the validations', () => {
        const { result } = renderHook(() =>
          useFormControl<string>(undefined, (v: string | undefined) => (v === 'bad' ? 'The value is in error' : '')),
        );
        expect(result.current.error).toBeFalsy();
        act(() => result.current.setValue('bad'));
        expect(result.current.error).toBe('The value is in error');
        act(() => result.current.setValue('good'));
        expect(result.current.error).toBeFalsy();
      });

      it('sets the value', () => {
        const { result } = renderHook(() =>
          useFormControl<string>(undefined, (v: string | undefined) => (v === 'bad' ? 'The value is in error' : '')),
        );
        act(() => result.current.setValue('bad'));
        expect(result.current.value).toEqual('bad');
      });
    });
  });

  describe('with an initial value string', () => {
    it('initializes the value to a string', () => {
      const { result } = renderHook(() => useFormControl<string>('starting value'));
      expect(result.current.value).toEqual('starting value');
    });

    it('has no errors', () => {
      const { result } = renderHook(() =>
        useFormControl<string>('starting value', (v: string | undefined) =>
          (v?.length || 0) < 5 ? '' : 'value is too long',
        ),
      );
      expect(result.current.error).toBeFalsy();
    });

    describe('validate', () => {
      it('sets the error message if the data is invalid', () => {
        const { result } = renderHook(() =>
          useFormControl<string>('starting value', (v: string | undefined) =>
            (v?.length || 0) < 5 ? '' : 'value is too long',
          ),
        );
        expect(result.current.error).toBeFalsy();
        act(() => result.current.validate());
        expect(result.current.error).toBe('value is too long');
      });

      it('does not set the error message if the data is valid', () => {
        const { result } = renderHook(() =>
          useFormControl<string>('dude', (v: string | undefined) => ((v?.length || 0) < 5 ? '' : 'value is too long')),
        );
        expect(result.current.error).toBeFalsy();
        act(() => result.current.validate());
        expect(result.current.error).toBeFalsy();
      });
    });

    describe('set value', () => {
      it('sets the new value', () => {
        const { result } = renderHook(() => useFormControl<string>('starting value'));
        act(() => result.current.setValue('This is a test'));
        expect(result.current.value).toEqual('This is a test');
      });

      it('runs validations', () => {
        const { result } = renderHook(() =>
          useFormControl<string>('four', (v: string | undefined) => ((v?.length || 0) < 5 ? '' : 'value is too long')),
        );
        expect(result.current.error).toBeFalsy();
        act(() => result.current.setValue('This is a test'));
        expect(result.current.error).toBe('value is too long');
      });
    });
  });

  describe('with an initial value number', () => {
    it('initializes the value to a number', () => {
      const { result } = renderHook(() => useFormControl<number>(42));
      expect(result.current.value).toEqual(42);
    });

    it('has no errors', () => {
      const { result } = renderHook(() =>
        useFormControl<number>(42, (v: number | undefined) => (v && v < 41 ? '' : 'value is too big')),
      );
      expect(result.current.error).toBeFalsy();
    });

    describe('validate', () => {
      it('sets the error message if the data is invalid', () => {
        const { result } = renderHook(() =>
          useFormControl<number>(42, (v: number | undefined) => (v && v < 41 ? '' : 'value is too big')),
        );
        expect(result.current.error).toBeFalsy();
        act(() => result.current.validate());
        expect(result.current.error).toBe('value is too big');
      });

      it('does not set the error message if the data is valid', () => {
        const { result } = renderHook(() =>
          useFormControl<number>(40, (v: number | undefined) => (v && v < 41 ? '' : 'value is too big')),
        );
        expect(result.current.error).toBeFalsy();
        act(() => result.current.validate());
        expect(result.current.error).toBeFalsy();
      });
    });

    describe('set value', () => {
      it('sets the new value', () => {
        const { result } = renderHook(() => useFormControl<number>(42));
        act(() => result.current.setValue(73));
        expect(result.current.value).toEqual(73);
      });

      it('runs the validations', () => {
        const { result } = renderHook(() =>
          useFormControl<number>(40, (v: number | undefined) => (v && v < 41 ? '' : 'value is too big')),
        );
        expect(result.current.error).toBeFalsy();
        act(() => result.current.setValue(73));
        expect(result.current.error).toBe('value is too big');
      });
    });
  });
});
