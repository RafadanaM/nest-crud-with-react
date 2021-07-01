import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import axios from "../../axios/axios";
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
  },

  text: {
    marginRight: "5px",
  },

  card: {
    display: "flex",
    margin: "10px",
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

  useEffect(() => {
    axios
      .get(`orders/user?status=${filter}`)
      .then(({ data }) => {
        console.log(data);
        setOrders(data);
      })
      .catch((e) => {
        alert(e);
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
      </div>
      {orders.length === 0 && <div>No Order</div>}
      {orders.map((order) => {
        return <OrderCard key={order.id} order={order} url={url} />;
      })}
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Order;
