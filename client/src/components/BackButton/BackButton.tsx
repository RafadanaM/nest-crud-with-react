import { Button, makeStyles } from "@material-ui/core";
import { ArrowBackIosOutlined } from "@material-ui/icons";
import { useHistory } from "react-router";
import React from "react";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.secondary.main,
  },
  title: {
    color: theme.palette.secondary.contrastText,
  },
}));
interface BackButtonProp {
  title: string;
}
const BackButton = ({ title }: BackButtonProp) => {
  const css = useStyles();
  let history = useHistory();
  return (
    <Button
      onClick={() => history.goBack()}
      className={css.title}
      startIcon={<ArrowBackIosOutlined className={css.icon} />}
    >
      {title}
    </Button>
  );
};

export default BackButton;
