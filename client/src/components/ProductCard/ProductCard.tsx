import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../interfaces/interface";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "250px",
    [theme.breakpoints.down("sm")]: {
      width: "150px",
    },

    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontSize: "0.8rem",
  },
  price: {
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
  },
}));

interface ProductCardProp {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProp) => {
  const css = useStyles();

  return (
    <Link to={`/product/${product.id}`} className={css.link}>
      <Card className={css.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Title"
            height="170"
            image="https://cdn.shopify.com/s/files/1/0031/0453/8673/products/moondrop-aria-lcp-diaphragm-dynamic-driver-in-ear-monitors-iems-hifigo-322894_700x700.jpg?v=1616995847"
            title="Title"
          />
          <CardContent>
            <Typography gutterBottom className={css.title} noWrap>
              {product.name}
            </Typography>
            <Typography gutterBottom className={css.price}>
              Rp{product.price}
            </Typography>
            <Box className={css.box}>
              <Typography className={css.price}>5 sold</Typography>
              <Typography className={css.price}>⭐ 5.0</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ProductCard;
