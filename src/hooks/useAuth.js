import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../service/auth.service";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    try {
      const response = await AuthService.login({
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("access_token", response.accessToken);
      setUser({ ...data, role: response.role });
      navigate("/exercises");
    } catch (error) {
      throw error;
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
