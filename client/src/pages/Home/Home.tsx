import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Product } from "../../interfaces/interface";

const useStyle = makeStyles((theme) => ({
  baseContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "1",

    padding: "1rem",
    marginTop: "0",

    backgroundColor: theme.palette.background.default,
  },
  productList: {
    display: "flex",
    flexWrap: "wrap",
  },
}));
const Home = () => {
  const css = useStyle();
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = (): void => {
    axios.get("/product").then(({ data }) => {
      console.log(data);

      setProducts(data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const renderProduct = () => {
    if (products.length > 0) {
      return products.map((product) => (
        <Grid item md={4} lg={3} key={product.id}>
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
