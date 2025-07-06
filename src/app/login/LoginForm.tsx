'use client';

import { login } from '@/actions/login';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Typography from '@/components/ui/Typography';
import useAuthStore from '@/stores/authStore';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

export default function LoginForm() {
  const [state, formAction] = useActionState(login, { error: '', success: undefined, data: undefined });
  const { pending } = useFormStatus();

  const { setUser, setAccessToken } = useAuthStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  if (state.success) {
    const {accessToken, ...rest} = state.data
    setUser(rest);
    setAccessToken(accessToken);
    redirect('/');
  }

  return (
      <form
        action={formAction}
        className="bg-secondary mt-6 w-full max-w-[600px] min-w-[320px] space-y-4 rounded-md px-8 py-12"
      >
        <Typography variant={'h6'} className="text-center">
          {' '}
          Login{' '}
        </Typography>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

      <div className='flex'>
        <Button type="submit" disabled={pending} className='mx-auto min-w-28'>
          {pending ? 'Logging in...' : 'Login'}
        </Button>

      </div>
      <Typography variant={'caption'} className="mt-4 text-center">
        Don't have an account? <Link href="/register" className='underline'>Register</Link>
      </Typography>
      </form>
  );
}
