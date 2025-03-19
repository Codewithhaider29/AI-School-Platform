import React, { useState } from 'react';
import { useAuthStore } from '../lib/store';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { User } from 'lucide-react';

const Profile = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: fullName,
          bio: bio,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-indigo-100 p-3 rounded-full">
            <User className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 text-red-700 p-4 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 text-green-700 p-4 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
            />
          </div>

          <div className="flex justify-end space-x-3">
            {!isEditing ? (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                variant="outline"
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;