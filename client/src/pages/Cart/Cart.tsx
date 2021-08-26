import { CircularProgress } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getChart } from "../../api/CartAPI";
import { CartI } from "../../interfaces/interface";

const Cart = () => {
  const [cart, setCart] = useState<CartI>();

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
        return <p>{cartItem.product.name}</p>;
      })}
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Cart;
