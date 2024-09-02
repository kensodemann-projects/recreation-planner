import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from '../page';

describe('Login Page', () => {
  it('has a header', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Login' })).toBeDefined();
  });
});
