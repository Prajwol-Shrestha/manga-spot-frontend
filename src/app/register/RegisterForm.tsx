'use client';

import { signup } from '@/actions/signup';
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

// TODO: password validation
export default function RegisterForm() {
  const [state, formAction] = useActionState(signup, { error: '', success: undefined, data: undefined });
  const { pending } = useFormStatus();

  const { setUser, setAccessToken } = useAuthStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    

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
        Register{' '}
      </Typography>

      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
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
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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

      <div>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          type="password"
          name="confirm-password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="flex">
        <Button type="submit" disabled={pending} className="mx-auto min-w-28">
          {pending ? 'Registering...' : 'Register'}
        </Button>
      </div>
      <Typography variant={'caption'} className="mt-4 text-center">
        Already have an account?{' '}
        <Link href="/login" className="underline">
          Login
        </Link>
      </Typography>
    </form>
  );
}
