import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { useParams } from "react-router-dom";
import { OrderI } from "../../interfaces/interface";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Status } from "../../enum/enum";
import OrderItemCard from "../../components/OrderItemCard/OrderItemCard";
const useStyles = makeStyles({
  baseContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },
  detail: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  list: {
    paddingLeft: "0",
    "& li": {
      listStyleType: "none",

      // "&:hover": {
      //   color: "red",
      // },
    },
  },
});
const OrderDetail = () => {
  let history = useHistory();
  const css = useStyles();
  const [disabled, setDisabled] = useState(false);
  const [order, setOrder] = useState<null | OrderI>(null);
  const { id } = useParams<{ id: string }>();

  const changeOrder = (status: string) => {
    setDisabled(true);
    if (status === Status.WaitingForPayment || status === Status.Delivering) {
      axios
        .post(
          `orders/${id}/${
            status === Status.WaitingForPayment ? "pay" : "received"
          }`
        )
        .then(() => {
          alert("Successful");

          setOrder((prevState) => {
            if (prevState) {
              return {
                ...prevState,
                status:
                  status === Status.WaitingForPayment
                    ? Status.WaitingForSeller
                    : Status.Completed,
              };
            }
            return null;
          });
        })
        .catch((err) => {
          alert("Failed");
        })
        .finally(() => {
          setDisabled(false);
        });
    } else {
      return null;
    }
  };
  useEffect(() => {
    axios
      .get(`orders/${id}`)
      .then(({ data }) => {
        console.log(data);

        setOrder(data);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 400) {
          history.push("/404", { message: "Order Not Found" });
        } else {
          history.push("/404");
        }
      });
    // eslint-disable-next-line
  }, []);
  return order ? (
    <div className={css.baseContainer}>
      <Typography variant="h4">{`Order Number: ${order.id}`}</Typography>
      <Grid container>
        <Grid container item xs={12} className={css.detail}>
          <Typography>{`Order Date: ${order.created}`}</Typography>
          <Typography>{`Status: ${order.status}`}</Typography>
        </Grid>
        <Grid container className={css.detail}>
          <ul className={css.list}>
            <li>{`Total Item(s): ${order.order_items.length}`}</li>
            <li>{`Total: ${order.total}`}</li>
          </ul>
          {(order.status === Status.WaitingForPayment ||
            order.status === Status.Delivering) && (
            <Button
              variant="contained"
              size="small"
              color="secondary"
              disabled={disabled}
              onClick={() => changeOrder(order.status)}
            >
              {order.status === Status.WaitingForPayment ? "Pay" : "Complete"}
            </Button>
          )}
        </Grid>
      </Grid>

      {order.order_items.map((orderItem) => {
        return <OrderItemCard key={orderItem.id} orderItem={orderItem} />;
      })}
    </div>
  ) : (
    <CircularProgress />
  );
};

export default OrderDetail;
