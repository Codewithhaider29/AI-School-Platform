import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../lib/store';
import { Button } from '../components/ui/button';
import { GraduationCap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data.user) {
        setUser(data.user);
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const autofillTestCredentials = () => {
    setEmail('test@example.com');
    setPassword('password123');
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <GraduationCap className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              type="submit"
              className="w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </Button>
            <Button
              type="button"
              className="ml-4 py-2 px-4 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300"
              onClick={() => setIsDialogOpen(true)}
            >
              Test Login
            </Button>
          </div>
        </form>

        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Test Credentials</h3>
              <p className="text-sm text-gray-600">Use these for testing:</p>
              <p className="text-sm text-gray-800">Email: test@example.com</p>
              <p className="text-sm text-gray-800">Password: password123</p>
              <div className="mt-4 flex justify-end">
                <Button className="mr-2" onClick={autofillTestCredentials}>Autofill</Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => setIsDialogOpen(false)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
