import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute = ({ children, ...routeProps }) => {
  const { user } = useAuth();
  // if (!user) {
  //   // user is not authenticated
  //   return <><Navigate to="/" /></>;
  // }
  return <Route {...routeProps} element={children} />;
};
