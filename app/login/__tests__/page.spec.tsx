import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LoginPage from '../page';

vi.mock('next/navigation');
vi.mock('./actions');

describe('Login Page', () => {
  afterEach(() => cleanup());

  it('has a header', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Time to Start Your Adventure' })).toBeDefined();
  });

  describe('Email Input', () => {
    it('exists', () => {
      render(<LoginPage />);
      expect(screen.getByLabelText('Email Address')).toBeDefined();
    });
  });

  describe('Password', () => {
    it('exists', () => {
      render(<LoginPage />);
      expect(screen.getByLabelText('Password')).toBeDefined();
    });
  });
});
