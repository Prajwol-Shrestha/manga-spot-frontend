'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Typography from '@/components/ui/Typography';
import useAuthStore from '@/stores/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';
import { IUserWithToken } from '@/types/user';

export default function RegisterForm() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      setLoading(true);
      const data = await universalFetcher<IUserWithToken>(END_POINTS.auth.signup, {
        config: { method: 'POST', body: JSON.stringify({ username, password, email, name }) },
      });

      const { accessToken, ...user } = data;
      setUser(user);

      toast.success('Registration successful!');
      router.push('/');
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-secondary mt-6 w-full max-w-[600px] min-w-[320px] space-y-4 rounded-md px-8 py-12"
    >
      <Typography variant={'h6'} className="text-center">
        Register
      </Typography>

      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <div>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex">
        <Button type="submit" disabled={loading} className="mx-auto min-w-28">
          {loading ? 'Registering...' : 'Register'}
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
