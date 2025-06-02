import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    describe('required error', () => {
      it('is not displayed initially', () => {
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Email Address is required')).toBeNull();
      });

      it('is displayed after tabbing out of the input', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Email Address is required')).toBeDefined();
      });

      it('is no longer displayed after text entry', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        await user.click(inp);
        await user.tab();
        await user.type(inp, 'f');
        expect(screen.queryByText('Email Address is required')).toBeNull();
        await user.clear(inp);
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Email Address is required')).toBeDefined();
      });
    });

    describe('email format error', () => {
      it('is not displayed initially', () => {
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Please enter a valid email address.')).toBeNull();
      });

      it('is not displayed after initial entry', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        await user.type(inp, 'foo');
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Please enter a valid email address.')).toBeNull();
      });

      it('is displayed after tabbing out of the input', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        await user.type(inp, 'foo');
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Please enter a valid email address.')).toBeDefined();
      });

      it('is no longer displayed once a valid email address is entered', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        await user.type(inp, 'foo');
        await user.tab();
        await user.type(inp, '@bar.com');
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Please enter a valid email address.')).toBeNull();
      });

      it('is not displayed with a valid email on initial tab out', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        await user.type(inp, 'foo@bar.com');
        await user.tab();
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Please enter a valid email address.')).toBeNull();
      });
    });
  });

  describe('Password', () => {
    it('exists', () => {
      render(<LoginPage />);
      expect(screen.getByLabelText('Password')).toBeDefined();
    });

    describe('required error', () => {
      it('is not displayed initially', () => {
        render(<LoginPage />);
        const inp = screen.getByLabelText('Password');
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Password is required')).toBeNull();
      });

      it('is displayed after tabbing out of the input', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);
        const inp = screen.getByLabelText('Password');
        await user.click(inp);
        await user.tab();
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Password is required')).toBeDefined();
      });

      it('is no longer displayed after text entry', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);
        const inp = screen.getByLabelText('Password');
        await user.click(inp);
        await user.tab();
        await user.type(inp, 'f');
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Password is required')).toBeNull();
        await user.clear(inp);
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Password is required')).toBeDefined();
      });
    });
  });

  describe('login button', () => {
    it('exists', () => {
      render(<LoginPage />);
      const btn = screen.getByRole('button', { name: 'Login' });
      expect(btn).toBeDefined();
    });

    it('starts disabled', () => {
      render(<LoginPage />);
      const btn = screen.getByRole('button', { name: 'Login' });
      expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('is disabled with only an email entered', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      const btn = screen.getByRole('button', { name: 'Login' });
      await user.type(screen.getByLabelText('Email Address'), 'foo@bar.com');
      expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('is disabled with only a password entered', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      const btn = screen.getByRole('button', { name: 'Login' });
      await user.type(screen.getByLabelText('Password'), 'cats are people too');
      expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('is enabled if a valid email and password are entered', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      const btn = screen.getByRole('button', { name: 'Login' });
      await user.type(screen.getByLabelText('Email Address'), 'foo@bar.com');
      await user.type(screen.getByLabelText('Password'), 'cats are people too');
      expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
    });

    it('is disabled if the email is invalid', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      const btn = screen.getByRole('button', { name: 'Login' });
      await user.type(screen.getByLabelText('Email Address'), 'foobar.com');
      await user.type(screen.getByLabelText('Password'), 'cats are people too');
      expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
    });
  });
});
