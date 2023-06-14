import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../service/auth.service";
import { useLocalStorage } from "./useLocalStorage";
import { User, UserCredentials } from "../interfaces/user";
interface IAuthContext {
  user: Partial<User>;
  login(credentials: UserCredentials): Promise<void>;
  logout(): void;
}
interface AuthProviderProps {
  children?: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (credentials: UserCredentials) => {
    try {
      const response = await AuthService.login({
        email: credentials.email,
        password: credentials.password,
      });

      if (!response.accessToken)
        throw new Error("Não foi possível entrar na conta");

      localStorage.setItem("access_token", response.accessToken);
      setUser({ email: credentials.email, role: response.role });
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

  const value: IAuthContext = useMemo(
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
