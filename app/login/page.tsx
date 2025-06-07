'use client';

import { useRouter } from 'next/navigation';
import { login } from './actions';
import Input from '../ui/input';
import { useFormControl } from '@/hooks/use-form-control';
import { isEmail, isRequired } from '@/utils/input-validations';
import BusyIndicator from '../ui/busy-indicator';
import { useState } from 'react';

const LoginPage = () => {
  const {
    value: email,
    error: emailError,
    touched: emailTouched,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
  } = useFormControl<string>('', (value: string | undefined) => isRequired(value, 'Email Address') || isEmail(value));
  const {
    value: password,
    error: passwordError,
    touched: passwordTouched,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
  } = useFormControl<string>('', (value: string | undefined) => isRequired(value, 'Password'));
  const router = useRouter();

  const displayedEmailError = emailTouched ? emailError : '';
  const displayedPasswordError = passwordTouched ? passwordError : '';
  const loginDisabled = !!(emailError || passwordError);

  const [busy, setBusy] = useState(false);

  return (
    <main className="flex flex-col items-center mt-24">
      <div className="card bg-base-300 shadow-xl mx-6 md:w-1/2">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Time to Start Your Adventure</h1>
          <Input
            id="email"
            disabled={busy}
            type="email"
            label="Email Address"
            value={email}
            error={displayedEmailError}
            onBlur={handleEmailBlur}
            onChange={(evt) => handleEmailChange(evt.target.value)}
          />
          <Input
            id="password"
            disabled={busy}
            type="password"
            label="Password"
            value={password}
            error={displayedPasswordError}
            onBlur={handlePasswordBlur}
            onChange={(evt) => handlePasswordChange(evt.target.value)}
          />
          <div className="card-actions justify-end mt-4">
            <button className="btn min-w-24" disabled={busy} onClick={() => router.back()}>
              Cancel
            </button>
            <button
              className="btn btn-primary min-w-24"
              disabled={loginDisabled || busy}
              onClick={() => {
                setBusy(true);
                login(email!, password!);
              }}
            >
              {busy ? BusyIndicator : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
