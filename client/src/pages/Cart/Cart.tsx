import { CircularProgress } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getChart } from "../../api/CartAPI";
import ItemCard from "../../components/ItemCard/ItemCard";
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
        return (
          <>
            <ItemCard
              key={cartItem.id}
              sellerName={cartItem.product.creator.username}
              itemName={cartItem.product.name}
              quantity={cartItem.quantity}
              price={cartItem.product.price}
            />
          </>
        );
      })}
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Cart;
