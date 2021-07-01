import { makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import React from "react";
import notfound from "../../assets/404.svg";

const useStyles = makeStyles({
  base: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  img: {
    minWidth: "200px",
  },
});

interface locationState {
  message: string;
}

const NotFound = () => {
  const css = useStyles();
  const location = useLocation();
  const state = location.state as locationState;
  return (
    <div className={css.base}>
      <img className={css.img} src={notfound} alt="Not found" />
      <h1>
        {state
          ? state.message
            ? state.message
            : "The page that you are trying to access does not exists!"
          : "The page that you are trying to access does not exists!"}
      </h1>
    </div>
  );
};

export default NotFound;
