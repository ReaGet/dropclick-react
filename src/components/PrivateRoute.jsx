import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

export const PrivateRoute = ({ children, hasSubscribition }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate replace to="/login" />;
  }

  if (hasSubscribition && user.subscribitions?.length === 0) {
    return <Navigate replace to="/" />;
  }

  return children;
}