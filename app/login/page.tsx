'use client';

import { useForm } from '@/hooks/use-form';
import { isEmail, isRequired } from '@/utils/input-validations';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AlertDialog from '../ui/alert-dialog';
import BusyIndicator from '../ui/busy-indicator';
import Input from '../ui/input';
import { login } from './actions';

const LoginPage = () => {
  const { fields } = useForm({
    email: { initialValue: '', validate: (v: string | undefined) => isRequired(v, 'Email Address') || isEmail(v) },
    password: { initialValue: '', validate: (v: string | undefined) => isRequired(v, 'Password') },
  });

  const router = useRouter();
  const loginDisabled =
    !(fields.email.value && fields.password.value) || !!(fields.email.error || fields.password.error);

  const [alertLoginFailed, setAlertLoginFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
            value={fields.email.value}
            error={fields.email.error}
            onBlur={fields.email.validate}
            onChange={(evt) => fields.email.setValue(evt.target.value)}
          />
          <Input
            id="password"
            disabled={busy}
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={fields.password.value}
            error={fields.password.error}
            onBlur={fields.password.validate}
            onChange={(evt) => fields.password.setValue(evt.target.value)}
          />
          <div className="card-actions justify-end mt-4">
            <div className="flex-1">
              <label className="label">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={showPassword}
                  onChange={(evt) => setShowPassword(evt.currentTarget.checked)}
                />
                Show password
              </label>
            </div>
            <button className="btn min-w-24" disabled={busy} onClick={() => router.back()}>
              Cancel
            </button>
            <button
              className="btn btn-primary min-w-24"
              disabled={loginDisabled || busy}
              onClick={async () => {
                setBusy(true);
                const { success } = await login(fields.email.value, fields.password.value);
                setBusy(false);
                if (success) {
                  router.replace('/adventure');
                } else {
                  setAlertLoginFailed(true);
                  fields.password.setValue('');
                }
              }}
            >
              {busy ? BusyIndicator : 'Login'}
            </button>
          </div>
        </div>
      </div>
      <AlertDialog
        title="Login Failed"
        message="Please check your email and password and try again."
        isOpen={alertLoginFailed}
        alertType="error"
        onResponse={() => setAlertLoginFailed(false)}
      />
    </main>
  );
};

export default LoginPage;
