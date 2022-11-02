import { fakeAuthProvider } from '../service/auth';

let AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  const signIn = (newUser, callback) => {
    return fakeAuthProvider.signIn(() => {
      setUser(newUser);
      callback();
    });
  };

  const signOut = (callback) => {
    return fakeAuthProvider.signOut(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

export default useAuth
