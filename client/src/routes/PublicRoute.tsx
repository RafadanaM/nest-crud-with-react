import React from "react";
import { Route, RouteProps } from "react-router-dom";
import classes from "./Route.module.css";
const PublicRoute = ({ component: Component, ...rest }: RouteProps) => {
  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <div className={classes.content}>
            <Component {...props} />
          </div>
        );
      }}
    />
  );
};

export default PublicRoute;
