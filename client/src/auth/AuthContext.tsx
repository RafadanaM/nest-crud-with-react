import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loginUser, logoutUser, registerUser } from "../api/AuthAPI";
import { getCurrentUser } from "../api/UserAPI";

import { UserInfo } from "../interfaces/interface";

interface IProps {
  children: ReactNode;
}

interface AuthContextProps {
  currentUser: UserInfo | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  loading: boolean;
  login: (username: string, password: string) => void;
  register: (
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string
  ) => void;
  logout: () => void;
  loginMessage: string;
  loginError: boolean;
  registerError: { value: boolean; msg: string };
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  loading: false,
  login: () => {},
  register: () => {},
  setCurrentUser: () => {},
  logout: () => {},
  loginMessage: "",
  loginError: false,
  registerError: { value: false, msg: "" },
});

const AuthProvider = ({ children }: IProps) => {
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState({ value: false, msg: "" });

  const register = (
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string
  ) => {
    setLoading(true);
    registerUser(username, password, email, firstname, lastname)
      .then(() => alert("Register Successful, please login"))
      .catch((error) => {
        console.log(error.response.data);
        setRegisterError({
          value: true,
          msg: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  const login = (username: string, password: string) => {
    setLoginError(false);
    setLoading(true);
    if (username.length === 0 || password.length === 0) {
      setLoginError(true);
      setLoginMessage("username and password cannot be empty!");
    } else {
      loginUser(username, password)
        .then((data) => {
          setCurrentUser(data);
          setLoginMessage("Login Success");
          setLoginError(false);
        })
        .catch((error) => {
          console.log(error.response.data);
          setLoginMessage(error.response.data.message.message);
          setLoginError(true);
        })
        .finally(() => setLoading(false));
    }
  };

  const logout = () => {
    logoutUser()
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };

  const getUser = () => {
    getCurrentUser()
      .then((data) => setCurrentUser(data))
      .catch((error) => {
        setCurrentUser(null);
        console.log(error);
      })
      .finally(() => setInitialLoading(false));
  };
  const AuthContextValue: AuthContextProps = useMemo(
    () => ({
      loading,
      currentUser,
      login,
      logout,
      register,
      registerError,
      loginMessage,
      loginError,
      setCurrentUser,
    }),
    [loading, loginError, registerError, currentUser, loginMessage]
  );

  useEffect(() => {
    getUser();
  }, [setCurrentUser]);
  return (
    <AuthContext.Provider value={AuthContextValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
