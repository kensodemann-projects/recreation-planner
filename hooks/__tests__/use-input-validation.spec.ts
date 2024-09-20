import { describe, expect, it } from 'vitest';
import { useInputValidation } from '../use-input-validation';
import { act, renderHook } from '@testing-library/react';

describe('Input Validation Hook', () => {
  it('starts with an empty value', () => {
    const { result } = renderHook(() => useInputValidation(() => ''));
    expect(result.current.value).toEqual('');
  });

  it('starts with an empty error', () => {
    const { result } = renderHook(() => useInputValidation(() => ''));
    expect(result.current.error).toEqual('');
  });

  describe('without an error', () => {
    it('sets the value', () => {
      const { result } = renderHook(() => useInputValidation(() => ''));
      act(() => result.current.handleChange('This is a test'));
      expect(result.current.value).toEqual('This is a test');
    });

    it('has no error', () => {
      const { result } = renderHook(() => useInputValidation(() => ''));
      act(() => {
        result.current.handleBlur();
        result.current.handleChange('This is a test');
      });
      expect(result.current.error).toEqual('');
    });
  });

  describe('with an error', () => {
    it('starts with an empty error', () => {
      const { result } = renderHook(() => useInputValidation(() => 'this is an error'));
      expect(result.current.error).toEqual('');
    });

    it('does not set the error if not touched', () => {
      const { result } = renderHook(() => useInputValidation(() => 'this is an error'));
      act(() => {
        result.current.handleChange('This is a test');
      });
      expect(result.current.error).toEqual('');
    });

    it('sets the error when touched', () => {
      const { result } = renderHook(() => useInputValidation(() => 'this is an error'));
      act(() => {
        result.current.handleBlur();
      });
      expect(result.current.error).toEqual('this is an error');
    });

    it('sets the error as changed after touched', () => {
      const { result } = renderHook(() => useInputValidation((v: string) => (v.length > 0 ? 'this is an error' : '')));
      act(() => {
        result.current.handleBlur();
      });
      expect(result.current.error).toEqual('');
      act(() => {
        result.current.handleChange('Dude!');
      });
      expect(result.current.error).toEqual('this is an error');
    });
  });
});
