import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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

      it('is displayed after blur-sm', () => {
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        fireEvent.blur(inp);
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Email Address is required')).toBeDefined();
      });

      it('is no lonber displayed after text entry', () => {
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        fireEvent.blur(inp);
        fireEvent.change(inp, { target: { value: 'f' } });
        expect(screen.queryByText('Email Address is required')).toBeNull();
        fireEvent.change(inp, { target: { value: '' } });
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

      it('is not displayed after initial entry', () => {
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        fireEvent.change(inp, { target: { value: 'foo' } });
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Please enter a valid email address.')).toBeNull();
      });

      it('is displayed after blur-sm', () => {
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        fireEvent.change(inp, { target: { value: 'foo' } });
        fireEvent.blur(inp);
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Please enter a valid email address.')).toBeDefined();
      });

      it('is no longer displayed once a valid email address is entered', () => {
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        fireEvent.change(inp, { target: { value: 'foo' } });
        fireEvent.blur(inp);
        fireEvent.change(inp, { target: { value: 'foo@bar.com' } });
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Please enter a valid email address.')).toBeNull();
      });

      it('is not displayed with a valid email on initial blur-sm', () => {
        render(<LoginPage />);
        const inp = screen.getByLabelText('Email Address');
        fireEvent.change(inp, { target: { value: 'foo@bar.com' } });
        fireEvent.blur(inp);
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

      it('is displayed after blur-sm', () => {
        render(<LoginPage />);
        const inp = screen.getByLabelText('Password');
        fireEvent.blur(inp);
        expect(inp.classList).toContain('input-error');
        expect(screen.getByText('Password is required')).toBeDefined();
      });

      it('is no lonber displayed after text entry', () => {
        render(<LoginPage />);
        const inp = screen.getByLabelText('Password');
        fireEvent.blur(inp);
        fireEvent.change(inp, { target: { value: 'f' } });
        expect(inp.classList).not.toContain('input-error');
        expect(screen.queryByText('Password is required')).toBeNull();
        fireEvent.change(inp, { target: { value: '' } });
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

    it('is disabled with only an email entered', () => {
      render(<LoginPage />);
      const btn = screen.getByRole('button', { name: 'Login' });
      const inp = screen.getByLabelText('Email Address');
      fireEvent.change(inp, { target: { value: 'foo@bar.com' } });
      expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('is disabled with only a password entered', () => {
      render(<LoginPage />);
      const btn = screen.getByRole('button', { name: 'Login' });
      const inp = screen.getByLabelText('Password');
      fireEvent.change(inp, { target: { value: 'cats are people too' } });
      expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('is enabled if a valid email and password are entered', () => {
      render(<LoginPage />);
      const btn = screen.getByRole('button', { name: 'Login' });
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      fireEvent.change(emailInput, { target: { value: 'foo@bar.com' } });
      fireEvent.change(passwordInput, { target: { value: 'cats are people too' } });
      expect(btn.attributes.getNamedItem('disabled')).toBeFalsy();
    });

    it('is disabled if the email is invalid', () => {
      render(<LoginPage />);
      const btn = screen.getByRole('button', { name: 'Login' });
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      fireEvent.change(emailInput, { target: { value: 'foobar.com' } });
      fireEvent.change(passwordInput, { target: { value: 'cats are people too' } });
      expect(btn.attributes.getNamedItem('disabled')).toBeTruthy();
    });
  });
});
