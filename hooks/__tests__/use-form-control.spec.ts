import { describe, expect, it } from 'vitest';
import { useFormControl } from '../use-form-control';
import { act, renderHook } from '@testing-library/react';

describe('Input Validation Hook', () => {
  describe('without an undefined initial value', () => {
    it('starts with an empty value', () => {
      const { result } = renderHook(() => useFormControl<string>());
      expect(result.current.value).toBeUndefined();
    });

    it('starts untouched', () => {
      const { result } = renderHook(() => useFormControl<string>());
      expect(result.current.touched).toEqual(false);
    });

    it('starts not dirty', () => {
      const { result } = renderHook(() => useFormControl<string>());
      expect(result.current.dirty).toEqual(false);
    });

    it('has no errors', () => {
      const { result } = renderHook(() => useFormControl<string>());
      expect(result.current.error).toBeUndefined();
    });

    it('runs validations', () => {
      const { result } = renderHook(() =>
        useFormControl<string>(undefined, (v: string | undefined) => (v ? '' : 'value is required')),
      );
      expect(result.current.error).toBe('value is required');
    });

    describe('after blur', () => {
      it('is touched', () => {
        const { result } = renderHook(() => useFormControl<string>());
        act(() => result.current.handleBlur());
        expect(result.current.touched).toEqual(true);
      });
    });

    describe('after change', () => {
      it('is dirty', () => {
        const { result } = renderHook(() => useFormControl<string>());
        act(() => result.current.handleChange('This is a test'));
        expect(result.current.dirty).toEqual(true);
      });
    });
  });

  describe('with an initial value string', () => {
    it('initializes the value to a string', () => {
      const { result } = renderHook(() => useFormControl<string>('starting value'));
      expect(result.current.value).toEqual('starting value');
    });

    it('starts untouched', () => {
      const { result } = renderHook(() => useFormControl<string>('starting value'));
      expect(result.current.touched).toEqual(false);
    });

    it('starts not dirty', () => {
      const { result } = renderHook(() => useFormControl<string>('starting value'));
      expect(result.current.dirty).toEqual(false);
    });

    it('has no errors', () => {
      const { result } = renderHook(() => useFormControl<string>('starting value'));
      expect(result.current.error).toBeUndefined();
    });

    it('runs validations (failed)', () => {
      const { result } = renderHook(() =>
        useFormControl<string>('starting value', (v: string | undefined) =>
          (v?.length || 0) < 5 ? '' : 'value is too long',
        ),
      );
      expect(result.current.error).toBe('value is too long');
    });

    it('runs validations (passed)', () => {
      const { result } = renderHook(() =>
        useFormControl<string>('four', (v: string | undefined) => ((v?.length || 0) < 5 ? '' : 'value is too long')),
      );
      expect(result.current.error).toBe('');
    });

    describe('after blur', () => {
      it('is touched', () => {
        const { result } = renderHook(() => useFormControl<string>('starting value'));
        act(() => result.current.handleBlur());
        expect(result.current.touched).toEqual(true);
      });

      it('has the original value', () => {
        const { result } = renderHook(() => useFormControl<string>('starting value'));
        act(() => result.current.handleBlur());
        expect(result.current.value).toEqual('starting value');
      });
    });

    describe('after change', () => {
      it('is dirty', () => {
        const { result } = renderHook(() => useFormControl<string>('starting value'));
        act(() => result.current.handleChange('This is a test'));
        expect(result.current.dirty).toEqual(true);
      });

      it('has the new value', () => {
        const { result } = renderHook(() => useFormControl<string>('starting value'));
        act(() => result.current.handleChange('This is a test'));
        expect(result.current.value).toEqual('This is a test');
      });

      it('runs validations', () => {
        const { result } = renderHook(() =>
          useFormControl<string>('four', (v: string | undefined) => ((v?.length || 0) < 5 ? '' : 'value is too long')),
        );
        expect(result.current.error).toBe('');
        act(() => result.current.handleChange('This is a test'));
        expect(result.current.error).toBe('value is too long');
      });
    });
  });

  describe('with an initial value number', () => {
    it('initializes the value to a number', () => {
      const { result } = renderHook(() => useFormControl<number>(42));
      expect(result.current.value).toEqual(42);
    });

    it('starts untouched', () => {
      const { result } = renderHook(() => useFormControl<number>(42));
      expect(result.current.touched).toEqual(false);
    });

    it('starts not dirty', () => {
      const { result } = renderHook(() => useFormControl<number>(42));
      expect(result.current.dirty).toEqual(false);
    });

    it('has no errors', () => {
      const { result } = renderHook(() => useFormControl<number>(42));
      expect(result.current.error).toBeUndefined();
    });

    it('runs validations (failed)', () => {
      const { result } = renderHook(() =>
        useFormControl<number>(42, (v: number | undefined) => (v && v < 41 ? '' : 'value is too big')),
      );
      expect(result.current.error).toBe('value is too big');
    });

    it('runs validations (passed)', () => {
      const { result } = renderHook(() =>
        useFormControl<number>(40, (v: number | undefined) => (v && v < 41 ? '' : 'value is too big')),
      );
      expect(result.current.error).toBe('');
    });

    describe('after blur', () => {
      it('is touched', () => {
        const { result } = renderHook(() => useFormControl<number>(42));
        act(() => result.current.handleBlur());
        expect(result.current.touched).toEqual(true);
      });

      it('has the original value', () => {
        const { result } = renderHook(() => useFormControl<number>(42));
        act(() => result.current.handleBlur());
        expect(result.current.value).toEqual(42);
      });
    });

    describe('after change', () => {
      it('is dirty', () => {
        const { result } = renderHook(() => useFormControl<number>(42));
        act(() => result.current.handleChange(73));
        expect(result.current.dirty).toEqual(true);
      });

      it('has the new value', () => {
        const { result } = renderHook(() => useFormControl<number>(42));
        act(() => result.current.handleChange(73));
        expect(result.current.value).toEqual(73);
      });

      it('runs the validations', () => {
        const { result } = renderHook(() =>
          useFormControl<number>(40, (v: number | undefined) => (v && v < 41 ? '' : 'value is too big')),
        );
        expect(result.current.error).toBe('');
        act(() => result.current.handleChange(73));
        expect(result.current.error).toBe('value is too big');
      });
    });
  });
});
