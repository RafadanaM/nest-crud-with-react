import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Clear, ClearAllOutlined } from "@material-ui/icons";
import React from "react";
import { Product } from "../../interfaces/interface";
import ProductCard from "../ProductCard/ProductCard";
interface EditProductModalI {
  open: boolean;
  onClose: () => void;
  product: Product | undefined;
}
const EditProductModal = ({ open, onClose, product }: EditProductModalI) => {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      {product ? (
        <>
          <DialogTitle id="customized-dialog-title">Modal title</DialogTitle>
          <DialogActions>
            <IconButton
              data-testid="close-modal"
              aria-label="close"
              onClick={onClose}
            >
              <Clear />
            </IconButton>
          </DialogActions>
          <DialogContent dividers>
            <Typography gutterBottom>{product.name}</Typography>
            <Typography gutterBottom>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={onClose} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </>
      ) : (
        <CircularProgress />
      )}
    </Dialog>
  );
};

export default EditProductModal;
