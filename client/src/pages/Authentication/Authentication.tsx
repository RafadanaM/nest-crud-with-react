import { Box, Button, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router";
import Logo from "../../assets/icon.svg";
import { useAuth } from "../../auth/AuthContext";
import Login from "../../components/Login";
import Register from "../../components/Register";

const useStyle = makeStyles((theme) => ({
  baseContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  boxContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    backgroundColor: theme.palette.background.paper,
    // height: "600px",
    // width: "500px",
  },
  buttonContainer: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    display: "flex",
  },

  buttonLogin: {
    borderRadius: "5px 0 0 0",
  },

  buttonRegister: {
    borderRadius: "0 5px 0 0",
  },
}));

// interface stateType {
//   from: { pathname: string };
// }
const Authentication = () => {
  const css = useStyle();
  const [isLogin, setIslogin] = useState(true);
  // let location = useLocation<stateType>();
  // const { from } = location.state || { from: { pathname: "/" } };
  const { currentUser } = useAuth();

  return currentUser ? (
    <Redirect to="/" />
  ) : (
    <Grid container className={css.baseContainer}>
      <Grid item xs={6}>
        <Box>
          <img src={Logo} alt="Logo" />
          <h1>LOGO</h1>
        </Box>
      </Grid>
      <Grid container item xs={6} justify="center" alignItems="center">
        <Paper className={css.boxContainer}>
          <Box className={css.buttonContainer}>
            <Button
              className={css.buttonLogin}
              fullWidth
              variant="contained"
              color={isLogin ? "secondary" : "primary"}
              disableElevation
              onClick={() => setIslogin(true)}
            >
              Login
            </Button>
            <Button
              className={css.buttonRegister}
              fullWidth
              variant="contained"
              color={!isLogin ? "secondary" : "primary"}
              disableElevation
              onClick={() => setIslogin(false)}
            >
              Register
            </Button>
          </Box>
          {isLogin ? <Login /> : <Register />}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Authentication;
