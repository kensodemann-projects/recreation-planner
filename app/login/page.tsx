'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from './actions';

const LoginPage = () => {
  // Just use state for now, but eventually we should have a ValidatedInput component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <main className="flex flex-col items-center mt-24">
      <div className="card bg-base-300 shadow-xl mx-6 md:w-1/2">
        <div className="card-body">
          <h2 className="card-title text-center">Time to Start Your Adventure</h2>
          <label htmlFor="email" className="mt-4">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="input input-bordered"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <label htmlFor="password" className="mt-4">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input input-bordered"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
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
