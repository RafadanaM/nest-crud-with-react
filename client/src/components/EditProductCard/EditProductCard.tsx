import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { findByLabelText } from "@testing-library/react";
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../interfaces/interface";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5px",
    minWidth: "275px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
  },

  cardHeader2: {
    marginTop: "5px",
    display: "flex",
    justifyContent: "space-between",
  },

  note: {
    flexBasis: "55%",
  },

  divider: {
    margin: "7px 0px",
    backgroundColor: theme.palette.secondary.main,
  },

  total: {
    textAlign: "end",
    margin: "5px 0px",
  },
  link: {
    textDecoration: "none",
    flex: "1",
  },
  list: {
    padding: 0,
    color: theme.palette.primary.contrastText,
    margin: "0.25rem",
    "& li": {
      listStyleType: "none",
    },
  },

  descriptionContainer: {
    width: "100%",
  },

  media: {
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  },

  text: {
    width: "100%",
  },

  buttonError: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.primary.contrastText,
  },

  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface EditProductCardI {
  product: Product;
  onOpenModal: (productId: string) => void;
}

const EditProductCard = ({ product, onOpenModal }: EditProductCardI) => {
  const css = useStyles();

  return (
    <Card className={css.root}>
      <CardContent>
        <CardMedia
          component="img"
          alt="Title"
          height="170"
          image="https://cdn.shopify.com/s/files/1/0031/0453/8673/products/moondrop-aria-lcp-diaphragm-dynamic-driver-in-ear-monitors-iems-hifigo-322894_700x700.jpg?v=1616995847"
          title="Title"
          className={css.media}
        />
        <Divider className={css.divider} />
        <Box className={css.descriptionContainer} textOverflow="ellipsis">
          <Typography gutterBottom variant="subtitle2">
            {`Name: ${product.name}`}
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            {`Price: Rp.${product.price}`}
          </Typography>
          <Typography variant="subtitle2">Availability:</Typography>
          <ul className={css.list}>
            <li>{`Stock: ${product.stock} unit`}</li>
            <li>{`Sold: ${product.sold} unit`}</li>
          </ul>
          <Typography variant="subtitle2">Specification:</Typography>
          <ul className={css.list}>
            <li>Condition: </li>
            <li>{`Dimension: ${product.length}cm X ${product.width}cm X ${product.height}cm`}</li>
            <li>{`Weight: ${product.weight}g`}</li>
          </ul>
          <Typography variant="subtitle2">Description:</Typography>
          <Typography className={css.text} noWrap>
            ajhsbdadbajhbdajhbdhjsabdhsabdhjsabdjhsabdas
            ahbdajsdbsahjbdsahdbsahjd sahbdsajbdsahj bdsahdbjsahdsahjd b
          </Typography>
        </Box>
      </CardContent>
      <CardActions className={css.buttonContainer}>
        <Button variant="contained" fullWidth className={css.buttonError}>
          HIDE
        </Button>

        <Button
          variant="contained"
          fullWidth
          color="secondary"
          onClick={() => onOpenModal(product.id)}
        >
          EDIT
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditProductCard;
