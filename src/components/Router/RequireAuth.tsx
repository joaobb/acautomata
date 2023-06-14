import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RolesId } from "../../enums/Roles";
import { useAuth } from "../../hooks/useAuth";
import React from "react";

interface RequireAuthProps {
  roleLevel: number;
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({
  roleLevel,
  children,
}): React.ReactNode => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!auth?.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (Number(auth?.user?.role) > RolesId[roleLevel])
    navigate("/login", { replace: true });
  else return children;
};

export default RequireAuth;
