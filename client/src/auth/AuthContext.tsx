import React, { createContext, ReactNode, useEffect, useState } from "react";
import axios from "../axios/axios";
import { UserInfo } from "../interfaces/interface";

interface IProps {
  children: ReactNode;
}

interface AuthContextProps {
  currentUser: UserInfo | null;
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
  login: () => {},
  register: () => {},
  logout: () => {},
  loginMessage: "",
  loginError: false,
  registerError: { value: false, msg: "" },
});

const AuthProvider = ({ children }: IProps) => {
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
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
    axios
      .post("register", { username, password, email, firstname, lastname })
      .then(({ data }) => {
        console.log(data);
        alert("Register Successful, please login");
      })
      .catch((error) => {
        console.log(error.response.data);
        setRegisterError({
          value: true,
          msg: error.response?.data.message,
        });
      });
  };

  const login = (username: string, password: string) => {
    setLoginError(false);
    if (username.length === 0 || password.length === 0) {
      setLoginError(true);
      setLoginMessage("username and password cannot be empty!");
    } else {
      axios
        .post("login", { username: username, password: password })
        .then(({ data }) => {
          console.log(data);

          setCurrentUser(data);
          setLoginMessage("Login Success");
          setLoginError(false);
        })
        .catch((error) => {
          console.log(error.response.data);
          setLoginMessage(error.response.data.message.message);
          setLoginError(true);
        });
    }
  };

  const logout = () => {
    axios
      .post("logout")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    axios
      .get("userInfo")
      .then(({ data }) => {
        console.log(data);
        setCurrentUser(data);
      })
      .catch((e) => {
        setCurrentUser(null);
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const AuthContextValue: AuthContextProps = {
    currentUser: currentUser,
    login: login,
    logout: logout,
    register: register,
    registerError: registerError,
    loginMessage: loginMessage,
    loginError: loginError,
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <AuthContext.Provider value={AuthContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
