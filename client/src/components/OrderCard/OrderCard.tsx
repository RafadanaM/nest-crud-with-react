import React from "react";
import { OrderI } from "../../interfaces/interface";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { months } from "../../enum/enum";
import ItemCard from "../ItemCard/ItemCard";
import theme from "../../theme";

const useStyles = makeStyles({
  root: {
    margin: "10px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeader2: {
    marginTop: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    margin: "5px 0px",
    backgroundColor: theme.palette.background.default,
  },
  total: {
    textAlign: "end",
    margin: "5px 0px",
  },
  link: {
    textDecoration: "none",
    marginLeft: "auto",
  },
});

interface OrderCardProp {
  order: OrderI;
  url: string;
}

const OrderCard = ({ order, url }: OrderCardProp) => {
  const css = useStyles();

  const showDate = (date: Date) => {
    const newDate: Date = new Date(date);
    const month: number = newDate.getMonth();
    const parsedDate: string = `${newDate.getDate()} ${
      months[month]
    } ${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
    return parsedDate;
  };

  return (
    <Card className={css.root}>
      <CardContent>
        <Box className={css.cardHeader}>
          <Typography>{`Order Date: ${showDate(order.created)}`}</Typography>
          <Typography>{order.status}</Typography>
        </Box>
        <Box className={css.cardHeader2}>
          <Typography>Items:</Typography>
          <Typography variant="h6" component="h3" className={css.total}>
            {`Total: Rp.${order.total}`}
          </Typography>
        </Box>

        <Divider className={css.divider} />
        {order.order_items.map((orderItem) => {
          return (
            <ItemCard
              key={orderItem.id}
              itemName={orderItem.name}
              price={orderItem.price}
              sellerName={orderItem.sellerName}
              quantity={orderItem.quantity}
            />
          );
        })}
      </CardContent>
      <Divider className={css.divider} />
      <CardActions>
        <Link to={`${url}/${order.id}`} className={css.link}>
          <Button size="small">Detail</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default OrderCard;
