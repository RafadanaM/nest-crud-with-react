import { makeStyles } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";
// import { Product } from "../../interfaces/interface";

const useStyles = makeStyles({
  baseContainer: {
    padding: "0.5rem",
  },
  paperContainer: {
    height: "300px",
    padding: "0.5rem",
  },
  img: {
    height: "300px",
    width: "100%",
    objectFit: "cover",
    borderRadius: "5px",
  },

  style: {
    backgroundColor: "cornflowerblue",
    borderRadius: 0,
  },
});

// interface ProductCarouselProp {
//   products: Product[];
// }
const ImageCarousel = () => {
  const css = useStyles();
  var items = [
    {
      img: "https://cdn.shopify.com/s/files/1/0031/0453/8673/products/moondrop-aria-lcp-diaphragm-dynamic-driver-in-ear-monitors-iems-hifigo-322894_700x700.jpg?v=1616995847",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0031/0453/8673/products/moondrop-aria-lcp-diaphragm-dynamic-driver-in-ear-monitors-iems-hifigo-322894_700x700.jpg?v=1616995847",
    },
  ];
  return (
    <Carousel
      fullHeightHover={false}
      autoPlay={false}
      animation="slide"
      navButtonsAlwaysVisible={true}
      timeout={500}
      className={css.baseContainer}
      navButtonsProps={{
        className: "",
        style: {
          backgroundColor: "rgba(0,0,0,0.45)",
        },
      }}
    >
      {items.map((item, i) => (
        <img key={i} src={item.img} alt={item.img} className={css.img} />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
