import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PageHeader from '../page-header';

describe('Page Header', () => {
  afterEach(() => cleanup());

  it('displays the content', () => {
    render(
      <PageHeader>
        <h1>I am content</h1>
      </PageHeader>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'I am content' })).toBeDefined();
  });
});
