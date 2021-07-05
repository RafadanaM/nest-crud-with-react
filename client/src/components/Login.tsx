import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

import { useAuth } from "../auth/AuthContext";
const useStyle = makeStyles((theme) => ({
  loginContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: theme.palette.background.default,
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    padding: "2em",
  },
  loginField: {
    margin: "1rem",
    color: "white",
  },
  input: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
  textFieldBorder: {
    borderColor: "#adadad",
  },
  focused: {
    borderColor: "red",
  },
  icon: { color: "#d8d8d8" },
}));
const Login = () => {
  const css = useStyle();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, loginMessage, loginError } = useAuth();

  const usernameHandler = (event: any) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const loginHandler = (event: any) => {
    event.preventDefault();
    setDisabled(true);
    login(username, password);
    setPassword("");
    setUsername("");
    setDisabled(false);
  };

  return (
    <Box className={css.loginContainer}>
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
        classes={{ root: css.input }}
      />
      <TextField
        required
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        value={password}
        className={css.loginField}
        onChange={passwordHandler}
        helperText={loginMessage}
        error={loginError}
        fullWidth
        classes={{ root: css.input }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <Visibility className={css.icon} />
                ) : (
                  <VisibilityOff className={css.icon} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={loginHandler}
        disabled={disabled}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
