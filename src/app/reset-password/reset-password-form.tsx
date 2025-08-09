'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Typography from '@/components/ui/Typography';
import { resetPassword } from '@/services/resetPassword';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (!email || !token) {
      toast.error('Invalid email or token');
      return;
    }
    if (email && token) {
      try {
        setLoading(true);
        const res = await resetPassword(email, token, password);
        toast.success(res.message);
      } catch (err) {
        console.log(err);
        toast.error('Something went wrong. Try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleReset}
      className="bg-secondary mx-auto mt-6 w-full max-w-[600px] min-w-[320px] space-y-4 rounded-md px-8 py-12"
    >
      <Typography variant={'h6'} className="text-center">
        Reset Password
      </Typography>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
      </div>

      <div>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          type="password"
          name="confirm-password"
          id="confirm-passw0rd"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value.trim())}
        />
      </div>

      <Button type="submit" className="mt-6" disabled={isLoading}>
        Reset
      </Button>
    </form>
  );
}
