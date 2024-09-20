import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PageHeader from '../page-header';

describe('Page Header', () => {
  afterEach(() => cleanup());

  it('displays the content in a level 1 heading', () => {
    render(<PageHeader>I am content</PageHeader>);
    expect(screen.getByRole('heading', { level: 1, name: 'I am content' })).toBeDefined();
  });
});
