import { Grid, makeStyles } from "@material-ui/core";
import {
  AirportShuttleOutlined,
  AssignmentLateOutlined,
  AssignmentOutlined,
  AssignmentReturnedOutlined,
  AssignmentTurnedInOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { getProductsByUser } from "../../api/ProductAPI";
import axios from "../../axios/axios";
import BackButton from "../../components/BackButton/BackButton";
import SubMenu from "../../components/SubMenu/SubMenu";
import { IconText, Product } from "../../interfaces/interface";

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
const UserProduct = () => {
  const css = useStyles();
  const subMenu: IconText[] = [
    {
      name: "Incoming Order",
      icon: <AssignmentOutlined className={css.icon} />,
      path: "/profile/product-manage/incoming-order",
    },
    {
      name: "Confirm Order",
      icon: <AssignmentLateOutlined className={css.icon} />,
      path: "/profile/product-manage/confirm-order",
    },
    {
      name: "Send Order",
      icon: <AssignmentReturnedOutlined className={css.icon} />,
      path: "/profile/product-manage/send-order",
    },
    {
      name: "In-Transit Order",
      icon: <AirportShuttleOutlined className={css.icon} />,
      path: "/profile/product-manage/delivering-order",
    },
    {
      name: "Completed Order",
      icon: <AssignmentTurnedInOutlined className={css.icon} />,
      path: "/profile/product-manage/completed-order",
    },
  ];

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsByUser().then((data) => setProducts(data));
  }, []);

  return (
    <div className={css.baseContainer}>
      <Grid item xs={12}>
        <BackButton title="Profile" />
      </Grid>

      <SubMenu subMenu={subMenu} />
      <h1>Product Management</h1>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export default UserProduct;
