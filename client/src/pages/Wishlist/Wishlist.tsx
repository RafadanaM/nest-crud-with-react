import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import BackButton from "../../components/BackButton/BackButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Product } from "../../interfaces/interface";
const Wishlist = () => {
  const [wishlists, setWishlists] = useState<null | Product[]>([]);

  useEffect(() => {
    axios.get("user/wishlist").then(({ data }) => {
      console.log(data);
      setWishlists(data);
    });
  }, []);

  return (
    <div>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <BackButton title="Profile" />
        </Grid>
        {wishlists &&
          wishlists.map((wishlist) => (
            <Grid item key={wishlist.id}>
              <ProductCard product={wishlist} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Wishlist;
