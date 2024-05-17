import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

export const PrivateRoute = ({ children, hasSubscribition }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate replace to="/login" />;
  }

  console.log(user)

  const subscribition = user?.subscribitions[0];

  if (hasSubscribition && subscribition && subscribition.status !== "exists") {
    return <Navigate replace to={`/?substatus=${subscribition.status}`} />;
  }

  return children;
}