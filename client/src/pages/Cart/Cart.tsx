import React, { useState, useEffect } from "react";
import { getChart } from "../../api/CartAPI";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getChart()
      .then((data) => {
        setCart(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return <div>Work in Progress :)</div>;
};

export default Cart;
