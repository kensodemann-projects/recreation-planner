'use client';

import { useRouter } from 'next/navigation';
import { login } from './actions';
import Input from '../ui/input';
import { isEmail, isRequired } from '@/utils/input-validations';
import BusyIndicator from '../ui/busy-indicator';
import { useState } from 'react';
import { useFormControl } from '@/hooks/use-form-control';

const LoginPage = () => {
  const {
    value: email,
    error: emailError,
    setValue: setEmail,
    validate: validateEmail,
  } = useFormControl<string>('', (value: string | undefined) => isRequired(value, 'Email Address') || isEmail(value));
  const {
    value: password,
    error: passwordError,
    setValue: setPassword,
    validate: validatePassword,
  } = useFormControl<string>('', (value: string | undefined) => isRequired(value, 'Password'));
  const router = useRouter();

  const loginDisabled = !(email && password) || !!(emailError || passwordError);

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
            error={emailError}
            onBlur={validateEmail}
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <Input
            id="password"
            disabled={busy}
            type="password"
            label="Password"
            value={password}
            error={passwordError}
            onBlur={validatePassword}
            onChange={(evt) => setPassword(evt.target.value)}
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
