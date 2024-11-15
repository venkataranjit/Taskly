import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  loggedIn,
  children,
}: {
  loggedIn: any;
  children: any;
}) => {
  return loggedIn ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
