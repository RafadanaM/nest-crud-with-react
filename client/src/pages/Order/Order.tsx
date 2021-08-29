import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { getOrderByUser } from "../../api/OrderAPI";
import BackButton from "../../components/BackButton/BackButton";
import StatusFilter from "../../components/StatusFilter/StatusFilter";
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
  text: {
    marginRight: "5px",
  },

  card: {
    display: "flex",
    margin: "10px",
  },
}));

const Order = () => {
  const css = useStyles();
  let query = new URLSearchParams(useLocation().search);
  let history = useHistory();
  let { url } = useRouteMatch();
  const [orders, setOrders] = useState<null | OrderI[]>(null);
  const [filter, setFilter] = useState(
    Object.values(Status).includes(query.get("status") as Status)
      ? query.get("status")
      : "all"
  );

  const changeFilterSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as Status);
  };

  const changeFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.value);
    setFilter(event.currentTarget.value as Status);
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
        <StatusFilter
          onClick={changeFilterClick}
          onChange={changeFilterSelect}
          currentFilter={filter ? filter : "all"}
        />
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
