import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate replace to="/login" />;
  }
  return children;
}