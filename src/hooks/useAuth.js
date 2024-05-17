import { createContext, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "services/Firebase";
import { useLocation } from "react-router-dom";
import SubscribitionService from "services/Subscribition";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const location = useLocation();

  const loadSubscribition = async (_user) => {
    if (!_user) return;
    SubscribitionService.getByEmail(_user.email).then((result) => {
      setUser({ ..._user, subscribitions: result });
    });
  }

  useEffect(() => {
    loadSubscribition(user);
  }, []);

  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await loadSubscribition(user);
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
      await loadSubscribition(user);
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

  const updatePassword = async (email, oldPassword, newPassword) => {
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      signup,
      updatePassword
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};