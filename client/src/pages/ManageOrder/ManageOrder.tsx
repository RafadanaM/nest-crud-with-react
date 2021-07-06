import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
// import {
//   AirportShuttleOutlined,
//   AssignmentLateOutlined,
//   AssignmentOutlined,
//   AssignmentReturnedOutlined,
//   AssignmentTurnedInOutlined,
// } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { changeOrderStatus, getOrderItemByUser } from "../../api/OrderItemAPI";
import axios from "../../axios/axios";
import BackButton from "../../components/BackButton/BackButton";
import OrderItemCard from "../../components/OrderItemCard/OrderItemCard";

import { Status } from "../../enum/enum";
import { OrderItem } from "../../interfaces/interface";

const useStyles = makeStyles((theme) => ({
  baseContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },

  card: {
    display: "flex",
    margin: "10px",
  },

  icon: {
    color: theme.palette.secondary.main,
  },

  button: {
    margin: "5px",
  },

  text: {
    marginRight: "5px",
  },

  filter: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "10px",
  },

  buttonBase: {
    borderRadius: "0",
    flex: "1",
    color: "white",
  },

  empty: {
    marginTop: "20px",
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonConfirm: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
    },
  },

  buttonCancel: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.light,
    },
  },
}));
const ManageOrder = () => {
  const css = useStyles();

  let query = new URLSearchParams(useLocation().search);
  let history = useHistory();
  const [filter, setFilter] = useState(
    Object.values(Status).includes(query.get("status") as Status)
      ? query.get("status")
      : "all"
  );
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const status: Status[] = [
    Status.All,
    Status.WaitingForPayment,
    Status.WaitingForSeller,
    Status.WaitingForDelivery,
    Status.Delivering,
    Status.Completed,
  ];

  const clickHandler = (status: Status) => {
    // query.set("status", Status.WaitingForDelivery);
    setFilter(status);
  };
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

  const orderAction = (orderId: string, status: string) => {
    let action: string;
    switch (status) {
      case Status.WaitingForSeller:
        action = "confirm";
        break;
      case Status.WaitingForDelivery:
        action = "send";
        break;

      default:
        return null;
    }

    changeOrderStatus(orderId, action)
      .then(() => {
        setOrderItems((prevState) =>
          prevState.filter(({ id }) => id !== orderId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrderItemByUser(filter)
      .then((data) => {
        setOrderItems(data);
      })
      .catch((error) => {
        alert(error);
      });
    history.replace({
      search: `?status=${filter}`,
    });
  }, [filter, history]);

  return (
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
      {orderItems.length === 0 && (
        <Typography variant="h4" className={css.empty}>
          Order is empty!
        </Typography>
      )}
      {orderItems.map((orderItem) => (
        <div className={css.card} key={orderItem.id}>
          <OrderItemCard orderItem={orderItem} />
          {(orderItem.status === Status.WaitingForSeller ||
            orderItem.status === Status.WaitingForDelivery) && (
            <Box className={css.baseContainer}>
              <Button
                className={`${css.buttonBase} ${css.buttonConfirm}`}
                variant="contained"
                onClick={() => orderAction(orderItem.id, orderItem.status)}
                disableElevation
              >
                Confirm
              </Button>
              <Button
                className={`${css.buttonBase} ${css.buttonCancel}`}
                variant="contained"
                disableElevation
              >
                Cancel
              </Button>
            </Box>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageOrder;
