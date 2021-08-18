import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/ProductAPI";
import ProductCard from "../../components/ProductCard/ProductCard";
// import { useToastS } from "../../components/Toast/ToastContext";
import { Product } from "../../interfaces/interface";

const useStyle = makeStyles((theme) => ({
  baseContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    marginTop: "0",
    backgroundColor: theme.palette.background.default,
  },
  baseGrid: {
    width: "100%",
  },
  productList: {
    display: "flex",
    flexWrap: "wrap",
  },
  product: {
    width: "100%",
  },
}));
const Home = () => {
  const css = useStyle();
  // const { openToast } = useToastS();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  // const open = () => {
  //   openToast("test");
  // };

  const renderProduct = () => {
    if (products.length > 0) {
      return products.map((product) => (
        <Grid item key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ));
    } else {
      return <h2>No product</h2>;
    }
  };

  return (
    <Paper elevation={0} className={css.baseContainer}>
      <Grid container alignItems="center" justify="flex-start" spacing={3}>
        {renderProduct()}
        {/* <Grid item md={4} lg={3} key={products[0].id}>
          <ProductCard product={products[0]} />
        </Grid>
        <Grid item md={4} lg={3} key={products[0].id}>
          <ProductCard product={products[0]} />
        </Grid>
        <Grid item md={4} lg={3} key={products[0].id}>
          <ProductCard product={products[0]} />
        </Grid>
        <Grid item md={4} lg={3} key={products[0].id}>
          <ProductCard product={products[0]} />
        </Grid>
        <Grid item md={4} lg={3} key={products[0].id}>
          <ProductCard product={products[0]} />
        </Grid> */}
      </Grid>
    </Paper>
  );
};

export default Home;
