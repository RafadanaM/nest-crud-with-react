import React, { ReactNode, useMemo } from "react";
import { useAuth } from "../auth/AuthContext";
import axiosInstance from "./axios";

interface WithAxiosI {
  children: ReactNode;
}

export const WithAxios = ({ children }: WithAxiosI) => {
  const { setCurrentUser, currentUser } = useAuth();

  useMemo(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        console.log(response);

        return response;
      },
      (error) => {
        const res = error.response;
        // console.log(res)

        switch (res.status) {
          case 401:
            console.log("err");

            if (currentUser) setCurrentUser(null);

            break;
          case 500:
            alert("Server ERROR");
            break;

          default:
            break;
        }

        return Promise.reject(error);
      }
    );
  }, [setCurrentUser, currentUser]);
  return <>{children}</>;
};
