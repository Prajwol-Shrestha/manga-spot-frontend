'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { updateUser } from '@/services/userService';
import useAuthStore from '@/stores/authStore';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function EditProfileForm() {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = await updateUser(formData);
      setUser(newUser);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" disabled name="username" defaultValue={user?.username} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" disabled name="email" type="email" defaultValue={user?.email} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" defaultValue={user?.name} onChange={handleChange} required />
      </div>
      <Button type="submit" className="w-full">
        Save Changes
      </Button>
    </form>
  );
}
