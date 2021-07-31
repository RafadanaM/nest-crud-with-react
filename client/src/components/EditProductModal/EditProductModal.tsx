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

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.contrastText,
  },
  field: {
    color: "white",
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
  input: {
    "& .MuiFormLabel-root.Mui-disabled": {
      color: "white",
    },
    "& .MuiInputBase-root.Mui-disabled": {
      color: "white",
    },
    "& .MuiInputBase-root": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline": {
      borderBottomColor: theme.palette.secondary.main,
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: theme.palette.secondary.main,
    },
    "& .MuiInput-underline.Mui-disabled:before": {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: theme.palette.secondary.main,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.secondary.main,
    },
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
            <TextField
              disabled={disabledEdit}
              id="name"
              label="Product Name"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ maxLength: 80, minLength: 0 }}
              value={currentProduct.name}
              className={css.field}
              // onChange={handleChange("firstName")}
              //helperText={registerValueError.firstName.msg}
              //error={registerValueError.firstName.value}
              fullWidth
              margin="normal"
              classes={{ root: css.input }}
            />
            <TextField
              disabled={disabledEdit}
              id="price"
              type="number"
              label="Price"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ min: 100 }}
              value={currentProduct.price}
              className={css.field}
              // onChange={handleChange("firstName")}
              //helperText={registerValueError.firstName.msg}
              //error={registerValueError.firstName.value}
              fullWidth
              margin="normal"
              classes={{ root: css.input }}
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
                <TextField
                  fullWidth
                  disabled={disabledEdit}
                  id="width"
                  type="number"
                  label="Width"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ min: 0, max: 100 }}
                  value={currentProduct.width}
                  className={css.field}
                  // onChange={handleChange("firstName")}
                  //helperText={registerValueError.firstName.msg}
                  //error={registerValueError.firstName.value}

                  margin="normal"
                  classes={{ root: css.input }}
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
                <TextField
                  fullWidth
                  disabled={disabledEdit}
                  id="length"
                  type="number"
                  label="Length"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ min: 0, max: 100 }}
                  value={currentProduct.length}
                  className={css.field}
                  // onChange={handleChange("firstName")}
                  //helperText={registerValueError.firstName.msg}
                  //error={registerValueError.firstName.value}

                  margin="normal"
                  classes={{ root: css.input }}
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
                <TextField
                  fullWidth
                  disabled={disabledEdit}
                  id="height"
                  type="number"
                  label="Height"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ min: 0, max: 100 }}
                  value={currentProduct.height}
                  className={css.field}
                  // onChange={handleChange("firstName")}
                  //helperText={registerValueError.firstName.msg}
                  //error={registerValueError.firstName.value}

                  margin="normal"
                  classes={{ root: css.input }}
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
            <TextField
              disabled={disabledEdit}
              id="weight"
              type="number"
              label="Weight"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ min: 0, max: 100 }}
              value={currentProduct.weight}
              className={css.field}
              // onChange={handleChange("firstName")}
              //helperText={registerValueError.firstName.msg}
              //error={registerValueError.firstName.value}
              fullWidth
              margin="normal"
              classes={{ root: css.input }}
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
                <TextField
                  disabled={disabledEdit}
                  id="currentStock"
                  type="number"
                  label="Stock"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ min: 0, max: 999 }}
                  value={currentProduct.stock}
                  className={css.field}
                  fullWidth
                  margin="normal"
                  classes={{ root: css.input }}
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
                <TextField
                  disabled={disabledEdit}
                  id="stock"
                  type="number"
                  label="Edit Stock"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: currentProduct.stock,
                    max: 999,

                    style: { textAlign: "center" },
                  }}
                  value={0}
                  className={css.field}
                  margin="normal"
                  classes={{ root: css.input }}
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

            <TextField
              disabled={disabledEdit}
              id="description"
              label="Description"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ maxLength: 80, minLength: 0 }}
              value={currentProduct.description}
              className={css.field}
              // onChange={handleChange("firstName")}
              //helperText={registerValueError.firstName.msg}
              //error={registerValueError.firstName.value}
              fullWidth
              multiline
              rows={5}
              margin="normal"
              classes={{ root: css.input }}
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
