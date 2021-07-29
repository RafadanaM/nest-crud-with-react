import { Grid, makeStyles } from "@material-ui/core";

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
}));
const ManageProduct = () => {
  const css = useStyles();

  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const handleOpenModal = (productId: string) => {
    const productsToFilter = [...products];
    setSelectedProduct(
      productsToFilter.find((product) => product.id === productId)
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getProductsByUser().then((data) => setProducts(data));
  }, []);

  return (
    <div className={css.baseContainer}>
      <Grid item xs={12}>
        <BackButton title="Profile" />
      </Grid>

      <h1>Product Management</h1>
      {products && (
        <>
          <EditProductModal
            open={openModal}
            onClose={handleCloseModal}
            product={selectedProduct}
          />
          <Grid container>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <EditProductCard
                  product={product}
                  onOpenModal={() => handleOpenModal(product.id)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default ManageProduct;
