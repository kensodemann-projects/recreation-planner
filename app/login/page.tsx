'use client';

import { useRouter } from 'next/navigation';
import { login } from './actions';
import Input from '../ui/input';
import { useInputValidation } from '@/hooks/use-input-validation';
import { isEmail, isRequired } from '@/utils/input-validations';

const LoginPage = () => {
  const {
    value: email,
    error: emailError,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
  } = useInputValidation((value: string) => isRequired(value, 'Email Address') || isEmail(value));
  const {
    value: password,
    error: passwordError,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
  } = useInputValidation((value: string) => isRequired(value, 'Password'));
  const router = useRouter();

  return (
    <main className="flex flex-col items-center mt-24">
      <div className="card bg-base-300 shadow-xl mx-6 md:w-1/2">
        <div className="card-body">
          <h1 className="card-title text-center">Time to Start Your Adventure</h1>
          <Input
            id="email"
            type="email"
            label="Email Address"
            value={email}
            error={emailError}
            onBlur={handleEmailBlur}
            onChange={(evt) => handleEmailChange(evt.target.value)}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            error={passwordError}
            onBlur={handlePasswordBlur}
            onChange={(evt) => handlePasswordChange(evt.target.value)}
          />
          <div className="card-actions justify-end mt-4">
            <button className="btn" onClick={() => router.back()}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={() => login(email, password)}>
              Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
