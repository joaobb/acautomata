import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RolesId } from "../../enums/Roles";
import { useAuth } from "../../hooks/useAuth";

function RequireAuth({ roleLevel, children }) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log(auth.user.role);

  if (auth.user.role > RolesId[roleLevel])
    return navigate("/login", { replace: true });

  return children;
}

export default RequireAuth;
