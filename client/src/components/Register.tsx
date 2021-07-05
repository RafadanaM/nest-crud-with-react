import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

// import { useAuth } from "../auth/AuthContext";
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
  registerField: {
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
const Register = () => {
  const css = useStyle();
  //   const { login, loginMessage, loginError } = useAuth();
  interface State {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
  }
  const [registerValue, setRegisterValue] = useState<State>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [registerValueError, setRegisterValueError] = useState({
    firstName: { value: false, msg: "" },
    lastName: { value: false, msg: "" },
    username: { value: false, msg: "" },
    password: { value: false, msg: "" },
    confirmPassword: { value: false, msg: "" },
    email: { value: false, msg: "" },
  });
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const isEmpty = Object.values(registerValue).includes("");
    const shouldBeDisabled =
      registerValueError.firstName.value ||
      registerValueError.lastName.value ||
      registerValueError.email.value ||
      registerValueError.username.value ||
      registerValueError.password.value ||
      registerValueError.confirmPassword.value ||
      isEmpty;
    console.log(registerValueError);
    console.log("BUTTON " + shouldBeDisabled);
    setDisabled(shouldBeDisabled);
  }, [registerValue, registerValueError]);

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setRegisterValue((prevState) => ({
        ...prevState,
        [prop]: value,
      }));

      if (value === "") {
        setRegisterValueError((prevState) => ({
          ...prevState,
          [prop]: { value: true, msg: "This field cannot be empty!" },
        }));
      } else {
        let regex: RegExp;
        let invalidMessage = "";
        if (prop === "firstName" || prop === "lastName") {
          regex = /^[a-zA-Z ]{1,30}$/;
          invalidMessage = "Must be letter only(Max 30)";
        } else if (prop === "username") {
          regex = /^([a-z0-9]){1,30}$/i;
          invalidMessage = "Must be Alphanumeric(Max 30)";
        } else if (prop === "password" || prop === "confirmPassword") {
          regex = /^([a-z0-9]){6,30}$/i;
          invalidMessage = "Must be Alphanumeric and have length of 6-30";
        } else if (prop === "email") {
          regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          invalidMessage = "Invalid Email";
        } else {
          return;
        }

        const valid = regex.test(value);
        if (!valid) {
          setRegisterValueError((prevState) => ({
            ...prevState,
            [prop]: { value: true, msg: invalidMessage },
          }));
        } else {
          if (prop === "password" || prop === "confirmPassword") {
            const toCheck =
              prop === "password" ? "confirmPassword" : "password";
            if (value !== registerValue[toCheck]) {
              setRegisterValueError((prevState) => ({
                ...prevState,
                password: {
                  value: true,
                  msg: "Password does not match",
                },
                confirmPassword: {
                  value: true,
                  msg: "Password does not match",
                },
              }));
            } else {
              setRegisterValueError((prevState) => ({
                ...prevState,
                password: { value: false, msg: "" },
                confirmPassword: { value: false, msg: "" },
              }));
            }
          } else {
            setRegisterValueError((prevState) => ({
              ...prevState,
              [prop]: { value: false, msg: "" },
            }));
          }
        }
      }
    };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const registerHandler = (event: any) => {
    event.preventDefault();
    setDisabled(true);
    // login(username, password);
    // setPassword("");
    // setUsername("");
    // setDisabled(false);
  };

  return (
    <Box className={css.loginContainer}>
      <TextField
        required
        id="firstname"
        label="First name"
        variant="outlined"
        value={registerValue.firstName}
        className={css.registerField}
        onChange={handleChange("firstName")}
        helperText={registerValueError.firstName.msg}
        error={registerValueError.firstName.value}
        fullWidth
        classes={{ root: css.input }}
      />
      <TextField
        required
        id="lastname"
        label="Last name"
        variant="outlined"
        value={registerValue.lastName}
        className={css.registerField}
        onChange={handleChange("lastName")}
        helperText={registerValueError.lastName.msg}
        error={registerValueError.lastName.value}
        fullWidth
        classes={{ root: css.input }}
      />
      <TextField
        required
        id="username"
        label="Username"
        variant="outlined"
        value={registerValue.username}
        className={css.registerField}
        onChange={handleChange("username")}
        helperText={registerValueError.username.msg}
        error={registerValueError.username.value}
        fullWidth
        classes={{ root: css.input }}
      />
      <TextField
        required
        id="email"
        label="Email"
        variant="outlined"
        type="email"
        value={registerValue.email}
        className={css.registerField}
        onChange={handleChange("email")}
        helperText={registerValueError.email.msg}
        error={registerValueError.email.value}
        fullWidth
        classes={{ root: css.input }}
      />
      <TextField
        required
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        value={registerValue.password}
        className={css.registerField}
        onChange={handleChange("password")}
        helperText={registerValueError.password.msg}
        error={registerValueError.password.value}
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
      <TextField
        required
        id="confirm-password"
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        value={registerValue.confirmPassword}
        className={css.registerField}
        onChange={handleChange("confirmPassword")}
        helperText={registerValueError.confirmPassword.msg}
        error={registerValueError.confirmPassword.value}
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
        onClick={registerHandler}
        disabled={disabled}
      >
        Login
      </Button>
    </Box>
  );
};

export default Register;
