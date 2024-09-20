import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Input from '../input';

describe('Validated Input', () => {
  afterEach(() => cleanup());

  it('labels the input', () => {
    render(<Input type="text" id="test-me" label="I am a test" value="foo" onChange={() => null} />);
    expect(screen.getByRole('textbox', { name: 'I am a test' })).toBeDefined();
  });

  it('displays the error', () => {
    render(
      <Input type="text" id="test-me" label="I am a test" value="foo" error="I am in error" onChange={() => null} />,
    );
    expect(screen.getByText('I am in error')).toBeDefined();
  });

  it('is marked as an error', () => {
    render(
      <Input type="text" id="test-me" label="I am a test" value="foo" error="I am in error" onChange={() => null} />,
    );
    const input = screen.getByRole('textbox');
    expect(input.classList).toContain('input-error');
  });
});
