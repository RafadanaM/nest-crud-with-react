import React from "react";
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  outlined: {
    borderBottomColor: theme.palette.secondary.main,
    borderBottom: "1px solid",
  },

  rounded: {
    borderRadius: "0px",
  },

  cardOutline: {
    borderColor: "red",
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

  note: {
    flexBasis: "55%",
  },

  divider: {
    margin: "7px 0px",
  },

  orderItemContainer: {
    display: "flex",
    height: "4rem",
  },

  orderItemContent: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginLeft: "0.5rem",
  },

  itemImage: {
    height: "4rem",
    width: "4rem",
  },

  total: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
}));

interface ItemCardProp {
  itemName: string;
  sellerName: string;
  quantity: number;
  price: string;
}

const ItemCard = ({ itemName, sellerName, quantity, price }: ItemCardProp) => {
  const css = useStyles();

  // const showDate = (date: Date) => {
  //   const newDate: Date = new Date(date);
  //   const month: number = newDate.getMonth();
  //   const parsedDate: string = `${newDate.getDate()} ${
  //     months[month]
  //   } ${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
  //   return parsedDate;
  // };

  return (
    <Card
      variant="outlined"
      className={`${css.root} ${css.outlined} ${css.rounded}`}
    >
      <CardContent>
        <Typography>{sellerName}</Typography>
        <Box className={css.orderItemContainer}>
          <img
            alt="Product"
            src="https://cdn.shopify.com/s/files/1/0031/0453/8673/products/moondrop-aria-lcp-diaphragm-dynamic-driver-in-ear-monitors-iems-hifigo-322894_700x700.jpg?v=1616995847"
            className={css.itemImage}
          />
          <Box className={css.orderItemContent}>
            <Box>
              <Typography>{itemName}</Typography>
              <Typography
                variant="body2"
                component="p"
                color="textSecondary"
              >{`${quantity} x Rp.${price}`}</Typography>
            </Box>
            <Box className={css.total}>
              <Typography component="h6">
                {`Rp.${quantity * parseInt(price)}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
