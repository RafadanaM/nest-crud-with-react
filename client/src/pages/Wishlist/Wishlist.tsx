import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUserWishlist } from "../../api/UserAPI";
import BackButton from "../../components/BackButton/BackButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Product } from "../../interfaces/interface";
const useStyles = makeStyles((theme) => ({
  baseContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "0",
  },
}));
const Wishlist = () => {
  const css = useStyles();
  const [wishlists, setWishlists] = useState<null | Product[]>([]);

  useEffect(() => {
    getUserWishlist().then((data) => setWishlists(data));
  }, []);

  return (
    <>
      {/* <Grid item xs={12}>
        <BackButton title="Profile" />
      </Grid> */}
      <Grid container className={css.baseContainer} spacing={3}>
        {wishlists &&
          wishlists.map((wishlist) => (
            <Grid item key={wishlist.id}>
              <ProductCard product={wishlist} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Wishlist;
