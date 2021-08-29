import {
  Button,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import { status } from "../../enum/enum";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "5px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  formControl: {
    minWidth: "100px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

interface StatusFilterI {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<{ value: unknown }>;
  currentFilter: string;
}

const StatusFilter = ({ onClick, currentFilter, onChange }: StatusFilterI) => {
  const css = useStyles();
  return (
    <>
      {status.map((x) => (
        <Button
          value={x}
          key={x}
          size="small"
          className={css.button}
          color="secondary"
          variant={x === currentFilter ? "contained" : "outlined"}
          onClick={onClick}
        >
          {x}
        </Button>
      ))}
      <FormControl
        color="secondary"
        variant="outlined"
        className={css.formControl}
        size="small"
      >
        <Select
          color="secondary"
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={currentFilter}
          onChange={onChange}
          // label="Age"
        >
          {status.map((x) => (
            <MenuItem value={x} key={x}>
              <em>{x}</em>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default StatusFilter;
