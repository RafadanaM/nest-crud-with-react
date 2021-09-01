import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import {
  AddOutlined,
  DeleteOutlineSharp,
  RemoveOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { getChart } from "../../api/CartAPI";
import { deleteCartItem, editCartItem } from "../../api/CartItemAPI";
import { EditTextField } from "../../components/EditTextField/EditTextField";
import ItemCard from "../../components/ItemCard/ItemCard";
import { CartI } from "../../interfaces/interface";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
  },
  cardAction: {
    display: "flex",
    flexDirection: "row-reverse",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
  },
  deleteIcon: {
    color: "white",
  },
  iconBackground: {
    backgroundColor: theme.palette.error.main,
  },
  textField: {
    marginRight: theme.spacing(1),
  },
}));
const Cart = () => {
  const css = useStyles();
  const [cart, setCart] = useState<CartI | null>(null);

  const removeItem = (cartItemId: string) => {
    deleteCartItem(cartItemId)
      .then((data) => {
        alert("Delete Success");
        setCart((prevState) => {
          if (prevState === null) return null;
          return {
            ...prevState,
            cart_items: [
              ...prevState.cart_items.filter(({ id }) => id !== cartItemId),
            ],
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editItem = (cartItemId: string, quantity: number) => {
    editCartItem(cartItemId, quantity)
      .then((data) => {
        console.log(data);
        setCart((prevState) => {
          if (prevState === null) return null;
          return {
            ...prevState,
            cart_items: [
              ...prevState.cart_items.map((cartItem) =>
                cartItem.id === cartItemId
                  ? { ...cartItem, quantity: data.quantity }
                  : cartItem
              ),
            ],
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getChart()
      .then((data) => {
        setCart(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return cart ? (
    <div>
      {cart.cart_items.map((cartItem) => {
        return (
          <Box className={css.card} key={cartItem.id}>
            <ItemCard
              key={cartItem.id}
              sellerName={cartItem.product.creator.username}
              itemName={cartItem.product.name}
              quantity={cartItem.quantity}
              price={cartItem.product.price}
            />
            <Card className={css.cardAction}>
              <Box className={css.iconBackground}>
                <IconButton
                  className={css.deleteIcon}
                  onClick={() => removeItem(cartItem.id)}
                >
                  <DeleteOutlineSharp />
                </IconButton>
              </Box>
              <EditTextField
                className={css.textField}
                disabled
                required={false}
                fullWidth={false}
                id="stock"
                type="number"
                // label="Quantity"
                inputProps={{
                  min: 1,
                  max: cartItem.product.stock,
                  style: { textAlign: "center" },
                }}
                value={cartItem.quantity}
                //onChange={}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        disabled={cartItem.quantity === 1}
                        color="secondary"
                        onClick={() =>
                          cartItem.product.stock > 1 &&
                          editItem(cartItem.id, cartItem.quantity - 1)
                        }
                      >
                        <RemoveOutlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        disabled={cartItem.quantity >= cartItem.product.stock}
                        color="secondary"
                        onClick={() =>
                          cartItem.quantity < cartItem.product.stock &&
                          editItem(cartItem.id, cartItem.quantity + 1)
                        }
                      >
                        <AddOutlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Card>
          </Box>
        );
      })}
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Cart;
