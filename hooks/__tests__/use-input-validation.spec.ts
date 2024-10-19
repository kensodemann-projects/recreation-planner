import { describe, expect, it } from 'vitest';
import { useInputValidation } from '../use-input-validation';
import { act, renderHook } from '@testing-library/react';

describe('Input Validation Hook', () => {
  it('starts with an empty value', () => {
    const { result } = renderHook(() => useInputValidation(() => ''));
    expect(result.current.value).toEqual('');
  });

  it('starts untouched', () => {
    const { result } = renderHook(() => useInputValidation(() => ''));
    expect(result.current.touched).toEqual(false);
  });

  it('is touched after blur', () => {
    const { result } = renderHook(() => useInputValidation(() => ''));
    act(() => result.current.handleBlur());
    expect(result.current.touched).toEqual(true);
  });

  describe('without an error', () => {
    it('starts with an empty error', () => {
      const { result } = renderHook(() => useInputValidation(() => ''));
      expect(result.current.error).toEqual('');
    });

    it('sets the value', () => {
      const { result } = renderHook(() => useInputValidation(() => ''));
      act(() => result.current.handleChange('This is a test'));
      expect(result.current.value).toEqual('This is a test');
    });

    it('has no error', () => {
      const { result } = renderHook(() => useInputValidation(() => ''));
      act(() => result.current.handleChange('This is a test'));
      expect(result.current.error).toEqual('');
    });
  });

  describe('with a required validation', () => {
    it('starts with an error', () => {
      const { result } = renderHook(() => useInputValidation((str: string) => (str ? '' : 'this is an error')));
      expect(result.current.error).toEqual('this is an error');
    });

    it('does not show the error with a valid value', () => {
      const { result } = renderHook(() => useInputValidation((str: string) => (str ? '' : 'this is an error')));
      act(() => result.current.handleChange('This is a test'));
      expect(result.current.error).toEqual('');
    });

    it('shows the error with an invalid value', () => {
      const { result } = renderHook(() => useInputValidation((str: string) => (str ? '' : 'this is an error')));
      act(() => result.current.handleChange('This is a test'));
      act(() => result.current.handleChange(''));
      expect(result.current.error).toEqual('this is an error');
    });
  });
});
