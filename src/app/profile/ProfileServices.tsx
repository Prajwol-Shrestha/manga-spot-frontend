'use client';

import React, { useState } from 'react';
import { Pencil, Lock, ArrowLeftCircle } from 'lucide-react';
import EditProfileForm from './EditProfileForm';
import ChangePasswordForm from './ChangePasswordForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type Tab = 'edit-profile' | 'change-password' | null;

export default function ProfileServices() {
  const [activeTab, setActiveTab] = useState<Tab>(null);

  const handleTabChange = (tab: Tab) => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  return (
    <div className="mx-auto max-w-xl space-y-6 px-4 py-6 sm:px-0">
      {!activeTab && (
        <>
          <Card className="transition hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pencil className="h-5 w-5" />
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleTabChange('edit-profile')}
              >
                Go to Edit Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="transition hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleTabChange('change-password')}
              >
                Go to Change Password
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'edit-profile' && (
        <Card>
          <CardHeader className="flex flex-row items-center">
            <Button
              className="!m-0 !p-0"
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab(null)}
              title="Go back"
            >
              <ArrowLeftCircle className="!h-6 !w-6" />
            </Button>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <EditProfileForm />
          </CardContent>
        </Card>
      )}

      {activeTab === 'change-password' && (
        <Card>
          <CardHeader className="flex flex-row items-center">
            <Button
              className="!m-0 !p-0"
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab(null)}
              title="Go back"
            >
              <ArrowLeftCircle className="!h-6 !w-6" />
            </Button>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
