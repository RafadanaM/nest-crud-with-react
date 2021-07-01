import {
  Box,
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router";
import Logo from "../../assets/icon.svg";
import { useAuth } from "../../auth/AuthContext";

const useStyle = makeStyles((theme) => ({
  baseContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifySelf: "center",
    alignSelf: "center",
    height: "100%",
    justifyContent: "space-evenly",
  },
  loginContainer: {
    maxWidth: "450px",
    display: "flex",

    borderRadius: "10px",
    boxShadow: "3px 3px 5px 6px #ccc",
    WebkitBoxShadow: "5px 5px 5px 6px rgba(0,0,0,0.25)",
    padding: "1.5rem",
    margin: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loginField: {
    margin: "1rem",
    color: "white",

    // "& .MuiOutlinedInput-root": {
    //   background: "lightgrey",
    // },
    // "& .MuiInputLabel": {
    //   background: "lightgrey",
    // },
  },
  input: {
    color: "white",
  },
  formContainer: {},
}));

// interface stateType {
//   from: { pathname: string };
// }
const Login = () => {
  const css = useStyle();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  // let location = useLocation<stateType>();
  // const { from } = location.state || { from: { pathname: "/" } };
  const { login, currentUser, loginMessage, loginError } = useAuth();

  const usernameHandler = (event: any) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  const loginHandler = (event: any) => {
    event.preventDefault();
    setDisabled(true);
    login(username, password);
    setPassword("");
    setUsername("");
    setDisabled(false);
  };
  return currentUser ? (
    <Redirect to="/" />
  ) : (
    <div className={css.baseContainer}>
      <Box>
        <img src={Logo} alt="Logo" />
        <h1>LOGO</h1>
      </Box>

      <form
        autoComplete="off"
        onSubmit={loginHandler}
        className={css.formContainer}
      >
        <Paper className={css.loginContainer}>
          <Typography>Login</Typography>
          <TextField
            required
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            className={css.loginField}
            onChange={usernameHandler}
            helperText={loginMessage}
            error={loginError}
            fullWidth
            InputProps={{ className: css.input }}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            className={css.loginField}
            onChange={passwordHandler}
            helperText={loginMessage}
            error={loginError}
            fullWidth
            InputProps={{ className: css.input }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={disabled}
          >
            Login
          </Button>
        </Paper>
      </form>
    </div>
  );
};

export default Login;
