import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Description from '../description';

describe('Description Component', () => {
  afterEach(() => cleanup());

  it('labels the textarea', () => {
    render(<Description id="test-me" label="I am a test" value="foo" onChange={() => null} onBlur={() => null} />);
    expect(screen.getByRole('textbox', { name: 'I am a test' })).toBeDefined();
    expect(screen.getByLabelText('I am a test', { selector: 'textarea' })).toBeDefined();
  });

  describe('with an error', () => {
    it('displays the error', () => {
      render(
        <Description
          id="test-me"
          label="I am a test"
          value="foo"
          error="I am in error"
          rows={4}
          onChange={() => null}
          onBlur={() => null}
        />,
      );
      expect(screen.getByText('I am in error')).toBeDefined();
    });

    it('is marked as an error', () => {
      render(
        <Description
          id="test-me"
          label="I am a test"
          value="foo"
          error="I am in error"
          onChange={() => null}
          onBlur={() => null}
        />,
      );
      const input = screen.getByRole('textbox');
      expect(input.classList).toContain('textarea-error');
    });
  });
});
