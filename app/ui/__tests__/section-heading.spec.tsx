import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import SectionHeading from '../section-heading';

describe('Page Header', () => {
  afterEach(() => cleanup());

  it('displays the content in a level 2 heading', () => {
    render(<SectionHeading>I am content</SectionHeading>);
    expect(screen.getByRole('heading', { level: 2, name: 'I am content' })).toBeDefined();
  });
});
