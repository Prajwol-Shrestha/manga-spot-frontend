'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { uploadToSupabase } from '@/lib/uploadToSupabase';
import { cn } from '@/lib/utils';
import { updateUser } from '@/services/userService';
import useAuthStore from '@/stores/authStore';
import { Trash2Icon, UploadCloudIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function EditProfileForm() {
  const { user, setUser } = useAuthStore();
  const avatarImgRef = useRef<HTMLImageElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
    name: user?.name || '',
    avatarUrl: user?.avatarUrl || null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (image) {
        const uploadResponse = await uploadToSupabase('avatars', image, user?.id);
        formData.avatarUrl = `https://fvlkhjnfwexwyiulowdg.supabase.co/storage/v1/object/public/${uploadResponse?.Key}`;
      }
      const newUser = await updateUser(formData);
      setUser(newUser);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files?.[0];
    if (avatarImgRef.current && imageFile) {
      setImage(imageFile);
      const tempUrl = URL.createObjectURL(imageFile);
      avatarImgRef.current.src = tempUrl;
    }
  }

  function handleFileRemove() {
    setImage(null);
    setFormData((prev) => ({ ...prev, avatarUrl: null }));
    if (avatarImgRef.current) {
      avatarImgRef.current.src = '';
    }
  }

  function handleUploadClick() {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 px-6">
      <div className="space-y-2">
        <div className="relative mx-auto h-22 w-22 overflow-hidden rounded-full">
          {!image && !user?.avatarUrl && (
            <div
              onClick={handleUploadClick}
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-gray-300"
            >
              <UploadCloudIcon className="text-gray-700" />
            </div>
          )}
          <input
            ref={imageInputRef}
            className="hidden"
            type="file"
            accept="image/*"
            multiple={false}
            onChange={handleFileChange}
          />
          <img
            decoding="async"
            loading="lazy"
            ref={avatarImgRef}
            src={user?.avatarUrl || ''}
            alt="avatar"
            className={cn('h-full w-full object-cover', {
              hidden: !image && !user?.avatarUrl,
            })}
          />
        </div>
        {user?.avatarUrl && !image && (
          <Button type="button" onClick={handleUploadClick} variant={'secondary'} className="mx-auto !bg-gray-600">
            <UploadCloudIcon />
            Change Image
          </Button>
        )}
        {(image || user?.avatarUrl) && (
          <Button type="button" onClick={handleFileRemove} variant={'destructive'} className="mx-auto !bg-red-600">
            <Trash2Icon />
            Remove Image
          </Button>
        )}
      </div>
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
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
