import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../lib/store';

const ProtectedRoute = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;