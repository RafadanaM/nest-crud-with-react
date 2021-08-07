import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import {
  AddOutlined,
  CancelOutlined,
  Clear,
  EditOutlined,
  RemoveOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { updateProduct } from "../../api/ProductAPI";
import { Product, ProductUpdate } from "../../interfaces/interface";
import { EditTextField } from "../EditTextField/EditTextField";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.contrastText,
  },
  numberInput: {
    "& .MuiTypography-root": {
      color: theme.palette.text.primary,
    },
  },
  dividers: {
    borderTop: `1px solid ${theme.palette.primary.main}`,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  editButton: {
    float: "right",
  },
}));

interface EditProductModalI {
  open: boolean;
  onClose: () => void;
  product: Product;
}
const EditProductModal = ({ open, onClose, product }: EditProductModalI) => {
  const css = useStyles();
  const [currentProduct, setCurrentProduct] = useState<Product>(product);

  const [productStock, setProductStock] = useState(0);
  const [currentProductError, setCurrentProductError] = useState({
    name: { value: false, msg: "" },
    price: { value: false, msg: "" },
    width: { value: false, msg: "" },
    length: { value: false, msg: "" },
    height: { value: false, msg: "" },
    weight: { value: false, msg: "" },
    stock: { value: false, msg: "" },
    description: { value: false, msg: "" },
  });
  const [disabledEdit, setDisableEdit] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    setCurrentProduct(product);
  }, [product]);
  useEffect(() => {
    const isEmpty = Object.values(currentProduct).includes("");
    const shouldBeDisabled =
      currentProductError.name.value ||
      currentProductError.description.value ||
      currentProductError.height.value ||
      currentProductError.length.value ||
      currentProductError.price.value ||
      currentProductError.stock.value ||
      currentProductError.weight.value ||
      currentProductError.width.value ||
      isEmpty ||
      currentProduct.stock + productStock < 0 ||
      disabledEdit;

    setDisabledButton(shouldBeDisabled);
  }, [currentProductError, productStock, disabledEdit, currentProduct]);

  const handleUpdateProduct = () => {
    const updatedProduct: ProductUpdate = {
      name: currentProduct.name,
      description: currentProduct.description,
      stock: productStock,
      price: +currentProduct.price,
      weight: +currentProduct.weight,
      height: +currentProduct.height,
      width: +currentProduct.width,
      length: +currentProduct.length,
    };

    updateProduct(updatedProduct, currentProduct.id)
      .then((data) => {
        setCurrentProduct(data);
        setDisableEdit(true);
        setProductStock(0);
        onClose();
      })
      .catch((error) => console.log(error));
  };

  const handleClose = () => {
    setCurrentProduct(product);
    setProductStock(0);
    setCurrentProductError({
      name: { value: false, msg: "" },
      price: { value: false, msg: "" },
      width: { value: false, msg: "" },
      length: { value: false, msg: "" },
      height: { value: false, msg: "" },
      weight: { value: false, msg: "" },
      stock: { value: false, msg: "" },
      description: { value: false, msg: "" },
    });
    setDisableEdit(true);
    onClose();
  };

  const handleEdit = () => {
    if (!disabledEdit) {
      setCurrentProduct(product);
      setProductStock(0);
      setCurrentProductError({
        name: { value: false, msg: "" },
        price: { value: false, msg: "" },
        width: { value: false, msg: "" },
        length: { value: false, msg: "" },
        height: { value: false, msg: "" },
        weight: { value: false, msg: "" },
        stock: { value: false, msg: "" },
        description: { value: false, msg: "" },
      });
    }
    setDisableEdit(!disabledEdit);
  };

  const handleStock = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProductStock(+value);
    let invalidMessage = "";
    let valid = false;
    const regex = /^\d+$/;
    if (regex.test(value)) {
      valid = true;
    } else {
      invalidMessage = "Must be a number";
    }

    if (!valid) {
      setCurrentProductError((prevState) => ({
        ...prevState,
        stock: { value: true, msg: invalidMessage },
      }));
    } else {
      setCurrentProductError((prevState) => ({
        ...prevState,
        stock: { value: false, msg: "" },
      }));
    }
  };
  const handleChange =
    (prop: keyof Product) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setCurrentProduct((prevState) => ({
        ...prevState,
        [prop]: value,
      }));

      if (value === "") {
        setCurrentProductError((prevState) => ({
          ...prevState,
          [prop]: { value: true, msg: "This field cannot be empty!" },
        }));
      } else {
        let regex: RegExp;
        let invalidMessage = "";
        let valid = false;
        if (prop === "name") {
          regex = /^[a-zA-Z0-9 ]{1,30}$/;
          invalidMessage = "Must be Alphanumeric (Max 30)";
          valid = regex.test(value);
        } else if (prop === "description") {
          regex = /^([a-zA-Z0-9 ]){0,150}$/i;
          invalidMessage = "Must be Alphanumeric(Max 150)";
          valid = regex.test(value);
        } else if (prop === "price") {
          regex = /^\d+$/;
          if (regex.test(value)) {
            if (+value >= 100) {
              valid = true;
            } else {
              invalidMessage = "Minimum price is Rp.100";
            }
          } else {
            invalidMessage = "Must be a number";
          }
        } else if (
          prop === "length" ||
          prop === "width" ||
          prop === "height" ||
          prop === "weight"
        ) {
          if (+value > 0) {
            valid = true;
          } else {
            invalidMessage = `${prop} cannot be 0`;
          }
          // regex = /^\d+$/;
          // if (regex.test(value)) {
          //   if (+value > 0) {
          //     valid = true;
          //   } else {
          //     invalidMessage = `${prop} cannot be 0`;
          //   }
          // } else {
          //   invalidMessage = "Must be a number";
          // }
        } else {
          return;
        }
        if (!valid) {
          setCurrentProductError((prevState) => ({
            ...prevState,
            [prop]: { value: true, msg: invalidMessage },
          }));
        } else {
          setCurrentProductError((prevState) => ({
            ...prevState,
            [prop]: { value: false, msg: "" },
          }));
        }
      }
    };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="sm"
    >
      {currentProduct ? (
        <>
          <Grid container justify="space-between">
            <DialogTitle id="customized-dialog-title">{`Edit Product`}</DialogTitle>
            <DialogActions>
              <IconButton
                data-testid="close-modal"
                aria-label="close"
                onClick={handleClose}
                className={css.icon}
              >
                <Clear />
              </IconButton>
            </DialogActions>
          </Grid>

          <DialogContent dividers classes={{ dividers: css.dividers }}>
            <Button
              className={css.editButton}
              variant="contained"
              color={disabledEdit ? "secondary" : "primary"}
              onClick={handleEdit}
              startIcon={disabledEdit ? <EditOutlined /> : <CancelOutlined />}
            >
              {disabledEdit ? "Edit" : "Cancel"}
            </Button>
            <EditTextField
              disabled={disabledEdit}
              id="name"
              label="Product Name"
              inputProps={{ maxLength: 80, minLength: 0 }}
              value={currentProduct.name}
              onChange={handleChange("name")}
              helperText={currentProductError.name.msg}
              error={currentProductError.name.value}
            />
            <EditTextField
              disabled={disabledEdit}
              id="price"
              type="number"
              label="Price"
              inputProps={{ min: 100 }}
              value={currentProduct.price}
              onChange={handleChange("price")}
              helperText={currentProductError.price.msg}
              error={currentProductError.price.value}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    classes={{ root: css.numberInput }}
                  >
                    Rp.
                  </InputAdornment>
                ),
              }}
            />
            <Grid container spacing={1}>
              <Grid item xs>
                <EditTextField
                  disabled={disabledEdit}
                  id="width"
                  type="number"
                  label="Width"
                  inputProps={{ min: 1, max: 100 }}
                  value={currentProduct.width}
                  onChange={handleChange("width")}
                  helperText={currentProductError.width.msg}
                  error={currentProductError.width.value}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        classes={{ root: css.numberInput }}
                      >
                        m
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs>
                <EditTextField
                  disabled={disabledEdit}
                  id="length"
                  type="number"
                  label="Length"
                  inputProps={{ min: 1, max: 100 }}
                  value={currentProduct.length}
                  onChange={handleChange("length")}
                  helperText={currentProductError.length.msg}
                  error={currentProductError.length.value}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        classes={{ root: css.numberInput }}
                      >
                        m
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs>
                <EditTextField
                  disabled={disabledEdit}
                  id="height"
                  type="number"
                  label="Height"
                  inputProps={{ min: 1, max: 100 }}
                  value={currentProduct.height}
                  onChange={handleChange("height")}
                  helperText={currentProductError.height.msg}
                  error={currentProductError.height.value}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        classes={{ root: css.numberInput }}
                      >
                        m
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <EditTextField
              disabled={disabledEdit}
              id="weight"
              type="number"
              label="Weight"
              inputProps={{ min: 1, max: 100 }}
              value={currentProduct.weight}
              onChange={handleChange("weight")}
              helperText={currentProductError.weight.msg}
              error={currentProductError.weight.value}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    classes={{ root: css.numberInput }}
                  >
                    Kg
                  </InputAdornment>
                ),
              }}
            />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <EditTextField
                  disabled={disabledEdit}
                  id="currentStock"
                  type="number"
                  label="Stock"
                  inputProps={{ min: 0, max: 999 }}
                  value={currentProduct.stock}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        classes={{ root: css.numberInput }}
                      >
                        Unit
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <EditTextField
                  disabled={disabledEdit}
                  id="stock"
                  type="number"
                  label="Edit Stock"
                  inputProps={{
                    min: -currentProduct.stock,
                    max: 999,
                    style: { textAlign: "center" },
                  }}
                  value={productStock}
                  onChange={handleStock}
                  helperText={currentProductError.stock.msg}
                  error={currentProductError.stock.value}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          color="secondary"
                          disabled={disabledEdit}
                          onClick={() =>
                            product.stock + (productStock - 1) >= 0 &&
                            setProductStock(productStock - 1)
                          }
                        >
                          <RemoveOutlined />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="secondary"
                          disabled={disabledEdit}
                          onClick={() => setProductStock(productStock + 1)}
                        >
                          <AddOutlined />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <EditTextField
              disabled={disabledEdit}
              id="description"
              label="Description"
              inputProps={{ maxLength: 80, minLength: 0 }}
              value={currentProduct.description}
              onChange={handleChange("description")}
              helperText={currentProductError.description.msg}
              error={currentProductError.description.value}
              fullWidth
              multiline
              rows={5}
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleUpdateProduct}
              color="secondary"
              disabled={disabledButton}
            >
              Save changes
            </Button>
          </DialogActions>
        </>
      ) : (
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default EditProductModal;
