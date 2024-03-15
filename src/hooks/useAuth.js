import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "services/Firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(user);
      return {
        success: true,
        data: { user },
      };
    } catch ({ code, message }) {
      return {
        success: false,
        data: { code, message },
      };
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const signup = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      setUser(user);
      return {
        success: true,
        data: {
          user
        },
      };
    } catch ({ code, message }) {
      return {
        success: false,
        data: { code, message },
      };
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      signup,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};