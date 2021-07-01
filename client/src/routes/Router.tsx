import React from "react";
import { Switch, BrowserRouter, Redirect, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Order from "../pages/Order/Order";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Profile from "../pages/Profile/Profile";
import Wishlist from "../pages/Wishlist/Wishlist";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import classes from "./Route.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
//import UserProduct from "../pages/UserProduct/UserProduct";
import ManageOrder from "../pages/ManageOrder/ManageOrder";

const Router = () => {
  return (
    <BrowserRouter>
      <div className={classes.base}>
        <Navbar />
        <ToastContainer />
        <Switch>
          <PublicRoute exact path="/" component={Home} />
          <PublicRoute path="/login" component={Login} />
          <Route
            path="/profile"
            render={({ match: { path } }) => (
              <Switch>
                <ProtectedRoute path={`${path}`} component={Profile} exact />
                <ProtectedRoute
                  path={`${path}/wishlist`}
                  component={Wishlist}
                />
                <ProtectedRoute
                  path={`${path}/order-manage`}
                  component={ManageOrder}
                />

                <Route
                  path={`${path}/order`}
                  render={({ match: { path } }) => (
                    <>
                      <ProtectedRoute
                        path={`${path}`}
                        component={Order}
                        exact
                      />
                      <ProtectedRoute
                        path={`${path}/:id`}
                        component={OrderDetail}
                      />
                    </>
                  )}
                />
                <Redirect to="/404" />
              </Switch>
            )}
          />
          {/* <ProtectedRoute path="/profile/wishlist" component={Wishlist} />
          <ProtectedRoute path="/profile/orders" component={Order} /> */}
          <PublicRoute path="/product/:id" component={ProductDetail} />
          <PublicRoute path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;