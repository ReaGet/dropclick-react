import { createContext, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "services/Firebase";
import SubscribitionService from "services/Subscribition";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const loadSubscibition = () => {
    if (!user) return;
    SubscribitionService.getByEmail(user.email).then((result) => {
      setUser({ ...user, subscribitions: result });
    });
  }

  useEffect(() => {
    loadSubscibition();
  }, []);

  // const subscibitions = await SubscribitionService.getByEmail(user.email).then((res) => res.json());
  // console.log(subscibitions)

  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      loadSubscibition();
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

  const updatePassword = async (email, oldPassword, newPassword) => {
    console.log(auth.currentUser)
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