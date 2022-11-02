import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const PublicRoute = ({ children, ...routeProps }) => {
  return <Route {...routeProps} element={children} />;
};
