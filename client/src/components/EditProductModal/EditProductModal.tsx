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
  TextField,
} from "@material-ui/core";
import {
  AddOutlined,
  Clear,
  EditOutlined,
  RemoveOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Product } from "../../interfaces/interface";
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
  product: Product | undefined;
}
const EditProductModal = ({ open, onClose, product }: EditProductModalI) => {
  const css = useStyles();
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [disabledEdit, setDisableEdit] = useState(true);
  useEffect(() => {
    setCurrentProduct(product);
  }, [product]);
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="sm"
    >
      {currentProduct ? (
        <>
          <Grid container justify="space-between">
            <DialogTitle id="customized-dialog-title">{`Edit ${currentProduct.name}`}</DialogTitle>
            <DialogActions>
              <IconButton
                data-testid="close-modal"
                aria-label="close"
                onClick={onClose}
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
              color="secondary"
              onClick={() => setDisableEdit(!disabledEdit)}
              startIcon={<EditOutlined />}
            >
              Edit
            </Button>
            <EditTextField
              disabled={disabledEdit}
              id="name"
              label="Product Name"
              inputProps={{ maxLength: 80, minLength: 0 }}
              value={currentProduct.name}
              // onChange={handleChange("firstName")}
              //helperText={registerValueError.firstName.msg}
              //error={registerValueError.firstName.value}
            />
            <EditTextField
              disabled={disabledEdit}
              id="price"
              type="number"
              label="Price"
              inputProps={{ min: 100 }}
              value={currentProduct.price}
              // onChange={handleChange("firstName")}
              //helperText={registerValueError.firstName.msg}
              //error={registerValueError.firstName.value}
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
                  inputProps={{ min: 0, max: 100 }}
                  value={currentProduct.width}
                  // onChange={handleChange("firstName")}
                  //helperText={registerValueError.firstName.msg}
                  //error={registerValueError.firstName.value}
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
                  inputProps={{ min: 0, max: 100 }}
                  value={currentProduct.length}
                  // onChange={handleChange("firstName")}
                  //helperText={registerValueError.firstName.msg}
                  //error={registerValueError.firstName.value}
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
                  inputProps={{ min: 0, max: 100 }}
                  value={currentProduct.height}
                  // onChange={handleChange("firstName")}
                  //helperText={registerValueError.firstName.msg}
                  //error={registerValueError.firstName.value}
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
              inputProps={{ min: 0, max: 100 }}
              value={currentProduct.weight}
              // onChange={handleChange("firstName")}
              //helperText={registerValueError.firstName.msg}
              //error={registerValueError.firstName.value}
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
              <Grid item xs={8} direction="row-reverse">
                <EditTextField
                  disabled={disabledEdit}
                  id="stock"
                  type="number"
                  label="Edit Stock"
                  inputProps={{
                    min: currentProduct.stock,
                    max: 999,
                    style: { textAlign: "center" },
                  }}
                  value={0}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton color="secondary" disabled={disabledEdit}>
                          <RemoveOutlined />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="secondary" disabled={disabledEdit}>
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
              // onChange={handleChange("firstName")}
              //helperText={registerValueError.firstName.msg}
              //error={registerValueError.firstName.value}
              fullWidth
              multiline
              rows={5}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={onClose} color="primary">
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
