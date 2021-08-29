import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { getOrderByUser } from "../../api/OrderAPI";
import BackButton from "../../components/BackButton/BackButton";
import OrderCard from "../../components/OrderCard/OrderCard";
import { Status } from "../../enum/enum";
import { OrderI } from "../../interfaces/interface";

const useStyles = makeStyles((theme) => ({
  baseContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },

  filter: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "10px",
  },

  button: {
    margin: "5px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  text: {
    marginRight: "5px",
  },

  card: {
    display: "flex",
    margin: "10px",
  },

  formControl: {
    minWidth: "100px",

    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const Order = () => {
  const status: Status[] = [
    Status.All,
    Status.WaitingForPayment,
    Status.WaitingForSeller,
    Status.WaitingForDelivery,
    Status.Delivering,
    Status.Completed,
  ];
  const css = useStyles();
  const [orders, setOrders] = useState<null | OrderI[]>(null);
  let query = new URLSearchParams(useLocation().search);
  let history = useHistory();
  const [filter, setFilter] = useState(
    Object.values(Status).includes(query.get("status") as Status)
      ? query.get("status")
      : "all"
  );

  const clickHandler = (status: Status) => {
    // query.set("status", Status.WaitingForDelivery);
    setFilter(status);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as Status);
  };

  let { url } = useRouteMatch();

  const renderFilter = () => {
    return status.map((x) => (
      <Button
        key={x}
        size="small"
        className={css.button}
        color="secondary"
        variant={x === query.get("status") ? "contained" : "outlined"}
        onClick={() => clickHandler(x)}
      >
        {x}
      </Button>
    ));
  };

  const renderFilterMobile = () => {
    return (
      <FormControl
        color="secondary"
        variant="outlined"
        className={css.formControl}
        size="small"
      >
        {/* <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel> */}
        <Select
          color="secondary"
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={filter}
          onChange={handleChange}
          // label="Age"
        >
          {status.map((x) => (
            <MenuItem value={x} key={x}>
              <em>{x}</em>
            </MenuItem>
          ))}

          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    );
  };

  useEffect(() => {
    getOrderByUser(filter)
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
    history.replace({
      search: `?status=${filter}`,
    });
  }, [filter, history]);

  return orders ? (
    <div className={css.baseContainer}>
      <Grid item xs={12}>
        <BackButton title="Profile" />
      </Grid>
      <div className={css.filter}>
        <Typography className={css.text} variant="subtitle2">
          STATUS
        </Typography>
        {renderFilter()}
        {renderFilterMobile()}
      </div>
      {orders.length === 0 && (
        <Typography variant="h1">Order is empty!</Typography>
      )}
      {orders.map((order) => {
        return <OrderCard key={order.id} order={order} url={url} />;
      })}
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Order;
