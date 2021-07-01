import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { IconText } from "../../interfaces/interface";

const useStyles = makeStyles((theme) => ({
  square: {
    width: "50%",
    paddingBottom: "50%",
  },
  link: {
    textDecoration: "none",
  },
  paperBase: {
    height: "100%",
    padding: "5px",
  },
  bottomBoxContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomBoxText: {
    marginTop: "5px",
  },
}));

interface SubMenuProp {
  subMenu: IconText[];
}

const SubMenu = ({ subMenu }: SubMenuProp) => {
  const css = useStyles();

  const renderSubMenu = () => {
    return subMenu.map((sub) => (
      <Grid item xs key={sub.name}>
        <Link to={sub.path} className={css.link}>
          <Paper className={css.paperBase}>
            <Box className={css.bottomBoxContent}>
              {sub.icon}
              <Typography className={css.bottomBoxText}>{sub.name}</Typography>
            </Box>
          </Paper>
        </Link>
      </Grid>
    ));
  };

  return (
    <Grid container justify="space-between" spacing={3}>
      {renderSubMenu()}
    </Grid>
  );
};

export default SubMenu;
