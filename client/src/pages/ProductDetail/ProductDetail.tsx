import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useParams } from "react-router-dom";
import { Product } from "../../interfaces/interface";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import { Favorite } from "@material-ui/icons";
import { useAuth } from "../../auth/AuthContext";
import BackButton from "../../components/BackButton/BackButton";
import theme from "../../theme";

import { bookmarkProduct, getProduct } from "../../api/ProductAPI";
import { getUserWishlist } from "../../api/UserAPI";
import { orderProduct } from "../../api/OrderAPI";
import { addToCart } from "../../api/CartAPI";
const useStyles = makeStyles({
  baseContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: "1",
    padding: "8px",
    marginTop: "20px",
  },
  paper: {
    height: "100%",
    width: "100%",
    padding: "8px",
  },
  paper2: {
    height: "100%",
    width: "100%",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  topContainer: {
    margin: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  list: {
    padding: 0,
    color: theme.palette.primary.contrastText,
    margin: "8px",
    "& li": {
      listStyleType: "none",
    },
  },
  bottomContainer: {
    marginTop: "0.5rem",
    display: "flex",
    flex: "1",

    justifyContent: "center",
  },
  bottomItem: {
    padding: "0.5rem",
    display: "flex",
    flexDirection: "column",
    flex: "1",
    height: "100%",
  },

  buttonContainer: { marginTop: "auto" },

  button: {
    margin: "0.25rem",
  },

  amountContainer: {
    display: "flex",
  },
  wishlist: {
    marginLeft: "auto",
    margin: "0",
    padding: "0",
  },
  iconWishlist: {
    transition: "all 500ms ease",
  },
  iconWishlistActive: {
    color: "red",
  },
});
const ProductDetail = () => {
  const history = useHistory();
  const css = useStyles();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<null | Product>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [isInWishlist, setIsInWistlist] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const order = async () => {
    setButtonDisabled(true);
    orderProduct(id);
    setButtonDisabled(false);
  };
  const wishlist = () => {
    bookmarkProduct(id)
      .then((data) => {
        data.isAdd ? setIsInWistlist(true) : setIsInWistlist(false);
      })
      .catch((err) => console.log(err));
  };

  const addProductToCart = () => {
    addToCart(id)
      .then((data) => {
        console.log(data);
        alert("Product added to wishlist");
      })
      .catch((error) => console.log(error));
  };

  const getWishlist = () => {
    getUserWishlist().then((data) => {
      const match = data.filter(
        (wishlistedProduct: any) => wishlistedProduct.id === id
      ).length;
      if (match < 1) {
        setIsInWistlist(false);
      } else {
        setIsInWistlist(true);
      }
    });
  };

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        if (currentUser) getWishlist();
        setProduct(data);
      })
      .catch((err) => history.push("/404", { message: "Product Not Found" }));

    // eslint-disable-next-line
  }, [id]);
  return product ? (
    <>
      <Grid item xs={12}>
        <BackButton title="Home" />
      </Grid>
      <Grid container></Grid>
      <Paper className={css.baseContainer}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <Paper className={css.paper} elevation={1}>
              <ImageCarousel />
            </Paper>
          </Grid>

          <Grid container item direction="column" xs={12} md={7}>
            <Paper elevation={1} className={css.paper2}>
              <Box className={css.topContainer}>
                <Typography className={css.title}>{product.name}</Typography>
                <Typography>{`⭐ ${product.rating}`}</Typography>
              </Box>
              <Box className={css.topContainer}>
                <Typography>{`Rp${product.price}`}</Typography>
                <Typography>{`${product.sold} sold`}</Typography>
              </Box>
              <Divider />
              <Box className={css.bottomContainer}>
                <Box className={css.bottomItem}>
                  <Typography>Specification:</Typography>
                  <ul className={css.list}>
                    <li>Condition: </li>
                    <li>{`Dimension: ${product.length}cm X ${product.width}cm X ${product.height}cm`}</li>
                    <li>{`Weight: ${product.weight}g`}</li>
                  </ul>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box className={css.bottomItem}>
                  <Box className={css.amountContainer}>
                    <Typography>Change Amount</Typography>
                    <IconButton
                      className={css.wishlist}
                      onClick={() => wishlist()}
                    >
                      <Favorite
                        className={`${css.iconWishlist} ${
                          isInWishlist ? css.iconWishlistActive : ""
                        }`}
                      />
                    </IconButton>
                  </Box>

                  <Typography>{`Stock: ${product.stock} left`}</Typography>
                  <Typography>{`Subtotal: Rp${product.price}`}</Typography>
                  <Box className={css.buttonContainer}>
                    <Button
                      color="secondary"
                      variant="contained"
                      fullWidth
                      className={css.button}
                      endIcon={<AddShoppingCartIcon />}
                      onClick={() => addProductToCart()}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      fullWidth
                      className={css.button}
                      onClick={() => order()}
                      disabled={buttonDisabled}
                    >
                      ORDER Now
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={css.paper}>
              <Typography>Description: </Typography>
              <Typography>{product.description}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  ) : (
    <CircularProgress />
  );
};

export default ProductDetail;
