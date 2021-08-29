import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Switch,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { Mode, months } from "../../enum/enum";
import { IconText } from "../../interfaces/interface";
import {
  FavoriteBorderOutlined,
  ReceiptOutlined,
  ShoppingCartOutlined,
  LocalMallOutlined,
} from "@material-ui/icons";
import SubMenu from "../../components/SubMenu/SubMenu";
import BackButton from "../../components/BackButton/BackButton";
import { Redirect, useHistory, useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  list: {
    padding: 0,
    margin: "0.25rem",
    "& li": {
      listStyleType: "none",
      marginTop: "1rem",
      color: "white",
    },
  },
  title: {
    fontWeight: "bold",
  },
  gridBase: {
    marginBottom: "10px",
  },

  divBase: {
    flex: "1",
  },

  paperBase: {
    height: "100%",
    padding: "10px",
  },

  paperImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "250px",
    height: "250px",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "200px",
      height: "200px",
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    fontSize: "4.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
    },
  },

  modeButton: {
    color: theme.palette.secondary.contrastText,
  },
}));

const Profile = () => {
  const css = useStyles();
  const subMenuBuyer: IconText[] = [
    {
      name: "Wishlist",
      icon: <FavoriteBorderOutlined className={css.icon} />,
      path: "/profile/wishlist",
    },
    {
      name: "Order",
      icon: <ReceiptOutlined className={css.icon} />,
      path: "/profile/order?status=all",
    },
    {
      name: "Cart",
      icon: <ShoppingCartOutlined className={css.icon} />,
      path: "/profile/cart",
    },
  ];

  const subMenuSeller: IconText[] = [
    {
      name: "Manage Product",
      icon: <LocalMallOutlined className={css.icon} />,
      path: "/profile/product-manage",
    },
    {
      name: "Manage Order",
      icon: <LocalMallOutlined className={css.icon} />,
      path: "/profile/order-manage?status=all",
    },
  ];

  let query = new URLSearchParams(useLocation().search);
  let history = useHistory();
  const { currentUser } = useAuth();

  const [mode, setMode] = useState(
    Object.values(Mode).includes(query.get("mode") as Mode)
      ? (query.get("mode") as Mode)
      : Mode.Buyer
  );

  const showDate = (date: Date) => {
    const newDate: Date = new Date(date);
    const month: number = newDate.getMonth();
    const parsedDate: string = `${newDate.getDate()} ${
      months[month]
    } ${newDate.getFullYear()} `;
    return parsedDate;
  };

  const changeMode = () => {
    setMode(mode === Mode.Buyer ? Mode.Seller : Mode.Buyer);
  };

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      if (currentUser.roles.includes("Seller")) {
        history.replace({
          search: `?mode=${mode}`,
        });
      } else {
        history.replace({
          search: "?mode=buyer",
        });
      }
    }
    // eslint-disable-next-line
  }, [mode, history]);
  return currentUser ? (
    <div className={css.divBase}>
      <Grid container spacing={2} justify="center" className={css.gridBase}>
        <Grid container justify="space-between" item xs={12}>
          <BackButton title="Home" />

          {currentUser.roles.includes("Seller") ? (
            <FormControlLabel
              control={
                <Switch checked={mode === Mode.Seller} onClick={changeMode} />
              }
              label="Seller Page"
            />
          ) : (
            <Button variant="contained" color="secondary">
              Become A Seller!
            </Button>
          )}
        </Grid>
        <Grid item md={4} xs={12}>
          <Paper className={`${css.paperBase} ${css.paperImage}`}>
            <Avatar
              alt="Profile"
              src="https://www.w3schools.com/howto/img_avatar2.png"
              className={css.profileImage}
            />
          </Paper>
        </Grid>
        <Grid item md={8} xs={12}>
          <Paper className={css.paperBase}>
            <Typography variant="h4" className={css.title}>
              PROFILE
            </Typography>

            <ul className={css.list}>
              <li>{`Username: ${currentUser.username}`}</li>
              <li>{`Email: ${currentUser.email}`}</li>
              <li>{`Member Since: ${showDate(currentUser.created)}`}</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>

      <SubMenu subMenu={mode === Mode.Seller ? subMenuSeller : subMenuBuyer} />
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Profile;
