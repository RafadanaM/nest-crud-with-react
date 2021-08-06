import React from "react";
import { makeStyles, TextField, TextFieldProps } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  field: {
    color: "white",
  },
  numberInput: {
    "& .MuiTypography-root": {
      color: theme.palette.text.primary,
    },
  },
  dividers: {
    borderTop: `1px solid ${theme.palette.primary.main}`,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  input: {
    "& .MuiFormLabel-root.Mui-disabled": {
      color: "white",
    },
    "& .MuiInputBase-root.Mui-disabled": {
      color: "white",
    },
    "& .MuiInputBase-root": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline": {
      borderBottomColor: theme.palette.secondary.main,
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: theme.palette.secondary.main,
    },
    "& .MuiInput-underline.Mui-disabled:before": {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: theme.palette.secondary.main,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.secondary.main,
    },
  },
}));

export const EditTextField = ({ disabled, ...rest }: TextFieldProps) => {
  const css = useStyles();
  return (
    <TextField
      disabled={disabled}
      {...rest}
      required
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      className={css.field}
      classes={{ root: css.input }}
    />
  );
};
