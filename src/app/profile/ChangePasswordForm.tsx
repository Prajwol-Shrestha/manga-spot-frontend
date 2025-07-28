import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { updateUser } from '@/services/userService';
import { useState } from 'react';
import { toast } from 'sonner';

const initialState = {
  newPassword: '',
  confirmPassword: '',
};

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    setSubmitting(true);
    try {
      const res = await updateUser({ password: formData.newPassword });
      toast.success('Password changed successfully');
      setFormData(initialState);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  );
}
