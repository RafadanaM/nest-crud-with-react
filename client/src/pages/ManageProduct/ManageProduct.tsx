import { Grid, makeStyles } from "@material-ui/core";
import {
  AirportShuttleOutlined,
  AssignmentLateOutlined,
  AssignmentOutlined,
  AssignmentReturnedOutlined,
  AssignmentTurnedInOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { getProductsByUser } from "../../api/ProductAPI";
import axios from "../../axios/axios";
import BackButton from "../../components/BackButton/BackButton";
import EditProductCard from "../../components/EditProductCard/EditProductCard";
import SubMenu from "../../components/SubMenu/SubMenu";
import { IconText, Product } from "../../interfaces/interface";

const useStyles = makeStyles((theme) => ({
  baseContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));
const ManageProduct = () => {
  const css = useStyles();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsByUser().then((data) => setProducts(data));
  }, []);

  return (
    <div className={css.baseContainer}>
      <Grid item xs={12}>
        <BackButton title="Profile" />
      </Grid>

      <h1>Product Management</h1>
      <Grid container>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <EditProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ManageProduct;
