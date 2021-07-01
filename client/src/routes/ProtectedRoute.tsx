import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import classes from "./Route.module.css";

const ProtectedRoute = ({ component: Component, ...rest }: RouteProps) => {
  const { currentUser } = useAuth();

  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <div className={classes.content}>
            <Component {...props} />
          </div>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    ></Route>
  );
};

export default ProtectedRoute;
