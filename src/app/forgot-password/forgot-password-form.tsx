'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Typography from '@/components/ui/Typography';
import { requestResetPassword } from '@/services/resetPassword';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await requestResetPassword(email);
      toast.success(res.message);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-secondary mx-auto mt-6 w-full max-w-[600px] min-w-[320px] space-y-4 rounded-md px-8 py-12"
    >
      <Typography variant={'h6'} className="text-center">
        Forgot Password
      </Typography>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
      </div>
      <Button type="submit" className="mt-6" disabled={isLoading}>
        Send reset link
      </Button>
    </form>
  );
}
