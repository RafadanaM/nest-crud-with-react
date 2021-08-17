import { Fab, Grid, makeStyles } from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";

import React, { useEffect, useState } from "react";
import { getProductsByUser } from "../../api/ProductAPI";

import BackButton from "../../components/BackButton/BackButton";
import EditProductCard from "../../components/EditProductCard/EditProductCard";
import EditProductModal from "../../components/EditProductModal/EditProductModal";

import { Product } from "../../interfaces/interface";

const useStyles = makeStyles((theme) => ({
  baseContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },
  icon: {
    color: theme.palette.secondary.main,
  },

  fab: {
    position: "fixed",
    bottom: "50px",
    right: "50px",
    cursor: "pointer",
    zIndex: 50,
  },
}));
const ManageProduct = () => {
  const css = useStyles();

  const [products, setProducts] = useState<Product[]>([]);
  const [choosenProduct, setChoosenProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = (product: Product | null) => {
    setChoosenProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    getProductsByUser().then((data) => setProducts(data));
  };

  useEffect(() => {
    getProductsByUser().then((data) => setProducts(data));
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <BackButton title="Profile" />
      </Grid>

      <h1>Product Management</h1>
      {products && (
        <>
          <Grid container>
            <EditProductModal
              open={openModal}
              onClose={handleCloseModal}
              product={choosenProduct}
            />
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <EditProductCard
                  product={product}
                  onOpenModal={() => handleOpenModal(product)}
                />
              </Grid>
            ))}
          </Grid>
          <Fab
            color="secondary"
            className={css.fab}
            onClick={() => handleOpenModal(null)}
          >
            <AddOutlined />
          </Fab>
        </>
      )}
    </>
  );
};

export default ManageProduct;
