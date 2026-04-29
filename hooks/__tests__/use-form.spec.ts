import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useForm } from '../use-form';

describe('useForm', () => {
  describe('initial state', () => {
    it('initializes field values from the schema', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: 'Alice' },
          age: { initialValue: 30 },
        }),
      );
      expect(result.current.fields.name.value).toBe('Alice');
      expect(result.current.fields.age.value).toBe(30);
    });

    it('has no errors on any field', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: '', validate: (v) => (!v ? 'Required' : undefined) },
        }),
      );
      expect(result.current.fields.name.error).toBeUndefined();
    });

    it('is not dirty', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: 'Alice' },
        }),
      );
      expect(result.current.isDirty).toBe(false);
    });

    it('is valid (no errors shown yet)', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: '', validate: (v) => (!v ? 'Required' : undefined) },
        }),
      );
      expect(result.current.isValid).toBe(true);
    });

    it('treats an empty string validation result as no error', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: 'Alice', validate: (v) => (v ? '' : 'Required') },
        }),
      );
      expect(result.current.fields.name.error).toBeFalsy();
      expect(result.current.isValid).toBe(true);
    });
  });

  describe('field.setValue', () => {
    it('updates the field value', () => {
      const { result } = renderHook(() => useForm({ name: { initialValue: '' } }));
      act(() => result.current.fields.name.setValue('Bob'));
      expect(result.current.fields.name.value).toBe('Bob');
    });

    it('runs validation and sets an error for an invalid value', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: 'valid', validate: (v) => (!v ? 'Required' : undefined) },
        }),
      );
      act(() => result.current.fields.name.setValue(''));
      expect(result.current.fields.name.error).toBe('Required');
    });

    it('clears an error when the value becomes valid', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: '', validate: (v) => (!v ? 'Required' : undefined) },
        }),
      );
      act(() => result.current.fields.name.validate());
      expect(result.current.fields.name.error).toBe('Required');
      act(() => result.current.fields.name.setValue('Alice'));
      expect(result.current.fields.name.error).toBeUndefined();
    });

    it('does not affect sibling fields', () => {
      const { result } = renderHook(() =>
        useForm({
          first: { initialValue: 'Alice' },
          last: { initialValue: 'Smith' },
        }),
      );
      act(() => result.current.fields.first.setValue('Bob'));
      expect(result.current.fields.last.value).toBe('Smith');
    });
  });

  describe('field.validate', () => {
    it('sets an error when the value fails validation', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: '', validate: (v) => (!v ? 'Required' : undefined) },
        }),
      );
      act(() => result.current.fields.name.validate());
      expect(result.current.fields.name.error).toBe('Required');
    });

    it('sets no error when the value passes validation', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: 'Alice', validate: (v) => (!v ? 'Required' : undefined) },
        }),
      );
      act(() => result.current.fields.name.validate());
      expect(result.current.fields.name.error).toBeUndefined();
    });

    it('does not affect sibling fields', () => {
      const { result } = renderHook(() =>
        useForm({
          first: { initialValue: '', validate: (v) => (!v ? 'Required' : undefined) },
          last: { initialValue: '' },
        }),
      );
      act(() => result.current.fields.first.validate());
      expect(result.current.fields.last.error).toBeUndefined();
    });

    it('uses the latest value when called immediately after setValue in the same tick', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: 'Alice', validate: (v) => (!v ? 'Required' : undefined) },
        }),
      );
      act(() => {
        result.current.fields.name.setValue('');
        result.current.fields.name.validate();
      });
      expect(result.current.fields.name.error).toBe('Required');
    });
  });

  describe('isDirty', () => {
    it('becomes true when a string field value changes', () => {
      const { result } = renderHook(() => useForm({ name: { initialValue: 'Alice' } }));
      act(() => result.current.fields.name.setValue('Bob'));
      expect(result.current.isDirty).toBe(true);
    });

    it('remains false when a string field is set to the same value', () => {
      const { result } = renderHook(() => useForm({ name: { initialValue: 'Alice' } }));
      act(() => result.current.fields.name.setValue('Alice'));
      expect(result.current.isDirty).toBe(false);
    });

    it('remains false when only whitespace is added to a string field (default trim comparison)', () => {
      const { result } = renderHook(() => useForm({ name: { initialValue: 'Alice' } }));
      act(() => result.current.fields.name.setValue('Alice   '));
      expect(result.current.isDirty).toBe(false);
    });

    it('becomes true when a non-string field changes', () => {
      const { result } = renderHook(() => useForm({ count: { initialValue: 1 } }));
      act(() => result.current.fields.count.setValue(2));
      expect(result.current.isDirty).toBe(true);
    });

    it('uses a custom equals function when provided', () => {
      const { result } = renderHook(() =>
        useForm({
          name: {
            initialValue: 'Alice',
            equals: (a, b) => a === b,
          },
        }),
      );
      act(() => result.current.fields.name.setValue('Alice   '));
      expect(result.current.isDirty).toBe(true);
    });

    it('does not flip isDirty when the schema initialValue changes between renders', () => {
      const { result, rerender } = renderHook(
        ({ initialName }: { initialName: string }) => useForm({ name: { initialValue: initialName } }),
        { initialProps: { initialName: 'Alice' } },
      );
      expect(result.current.isDirty).toBe(false);
      rerender({ initialName: 'Bob' });
      expect(result.current.isDirty).toBe(false);
    });

    it('uses the updated schema initialValue as the baseline after reset', () => {
      const { result, rerender } = renderHook(
        ({ initialName }: { initialName: string }) => useForm({ name: { initialValue: initialName } }),
        { initialProps: { initialName: 'Alice' } },
      );
      rerender({ initialName: 'Bob' });
      act(() => result.current.reset());
      expect(result.current.isDirty).toBe(false);
      act(() => result.current.fields.name.setValue('Alice'));
      expect(result.current.isDirty).toBe(true);
    });

    it('is true when at least one field has changed', () => {
      const { result } = renderHook(() =>
        useForm({
          first: { initialValue: 'Alice' },
          last: { initialValue: 'Smith' },
        }),
      );
      act(() => result.current.fields.last.setValue('Jones'));
      expect(result.current.isDirty).toBe(true);
    });
  });

  describe('isValid', () => {
    it('is false when any field has an error', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: '', validate: (v) => (!v ? 'Required' : undefined) },
        }),
      );
      act(() => result.current.fields.name.validate());
      expect(result.current.isValid).toBe(false);
    });

    it('returns to true after the error is resolved', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: '', validate: (v) => (!v ? 'Required' : undefined) },
        }),
      );
      act(() => result.current.fields.name.validate());
      expect(result.current.isValid).toBe(false);
      act(() => result.current.fields.name.setValue('Alice'));
      expect(result.current.isValid).toBe(true);
    });
  });

  describe('validateAll', () => {
    it('triggers validation for every field', () => {
      const { result } = renderHook(() =>
        useForm({
          first: { initialValue: '', validate: (v) => (!v ? 'First required' : undefined) },
          last: { initialValue: '', validate: (v) => (!v ? 'Last required' : undefined) },
        }),
      );
      act(() => result.current.validateAll());
      expect(result.current.fields.first.error).toBe('First required');
      expect(result.current.fields.last.error).toBe('Last required');
    });

    it('clears errors for fields that now pass validation', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: '', validate: (v) => (!v ? 'Required' : undefined) },
        }),
      );
      act(() => result.current.fields.name.validate());
      expect(result.current.fields.name.error).toBe('Required');
      act(() => result.current.fields.name.setValue('Alice'));
      act(() => result.current.validateAll());
      expect(result.current.fields.name.error).toBeUndefined();
    });
  });

  describe('reset', () => {
    it('restores all field values to their initial values', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: 'Alice' },
          age: { initialValue: 30 },
        }),
      );
      act(() => {
        result.current.fields.name.setValue('Bob');
        result.current.fields.age.setValue(99);
      });
      act(() => result.current.reset());
      expect(result.current.fields.name.value).toBe('Alice');
      expect(result.current.fields.age.value).toBe(30);
    });

    it('clears all errors', () => {
      const { result } = renderHook(() =>
        useForm({
          name: { initialValue: '', validate: (v) => (!v ? 'Required' : undefined) },
        }),
      );
      act(() => result.current.fields.name.validate());
      expect(result.current.fields.name.error).toBe('Required');
      act(() => result.current.reset());
      expect(result.current.fields.name.error).toBeUndefined();
    });

    it('sets isDirty back to false', () => {
      const { result } = renderHook(() => useForm({ name: { initialValue: 'Alice' } }));
      act(() => result.current.fields.name.setValue('Bob'));
      expect(result.current.isDirty).toBe(true);
      act(() => result.current.reset());
      expect(result.current.isDirty).toBe(false);
    });
  });
});
