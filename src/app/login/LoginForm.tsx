'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Typography from '@/components/ui/Typography';
import { END_POINTS } from '@/constants/endpoints';
import { setCookie } from '@/lib/cookies';
import universalFetcher from '@/lib/fetcher';
import useAuthStore from '@/stores/authStore';
import { IUserWithToken } from '@/types/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function LoginForm() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await universalFetcher<IUserWithToken>(END_POINTS.auth.login, {
        config: { method: 'POST', body: JSON.stringify({ username, password }) },
      });
      const { accessToken, ...user } = data;

      setUser(user);
      await setCookie('accessToken', accessToken);

      toast.success('Logged in successfully');
      router.push('/');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="bg-secondary mt-6 w-full max-w-[600px] min-w-[320px] space-y-4 rounded-md px-8 py-12"
    >
      <Typography variant="h6" className="text-center">
        Login
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
      <div className="flex">
        <Button type="submit" disabled={loading} className="mx-auto min-w-28">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </div>
      <Typography variant="caption" className="mt-4 text-center">
        Don't have an account?{' '}
        <Link href="/register" className="underline">
          Register
        </Link>
      </Typography>
    </form>
  );
}
