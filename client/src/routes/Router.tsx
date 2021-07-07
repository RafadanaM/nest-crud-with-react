import React from "react";
import { Switch, BrowserRouter, Redirect, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Home from "../pages/Home/Home";
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
import Cart from "../pages/Cart/Cart";
import Authentication from "../pages/Authentication/Authentication";
import { ToastProvider } from "../components/Toast/ToastContext";
import { WithAxios } from "../axios/WithAxios";
import ManageProduct from "../pages/ManageProduct/ManageProduct";

const Router = () => {
  return (
    <BrowserRouter>
      <div className={classes.base}>
        <WithAxios>
          {/* <ToastContainer /> */}
          <Navbar />
          <ToastProvider>
            <Switch>
              <PublicRoute exact path="/" component={Home} />
              <PublicRoute path="/login" component={Authentication} />
              <Route
                path="/profile"
                render={({ match: { path } }) => (
                  <Switch>
                    <ProtectedRoute
                      path={`${path}`}
                      component={Profile}
                      exact
                    />
                    <ProtectedRoute path={`${path}/cart`} component={Cart} />
                    <ProtectedRoute
                      path={`${path}/wishlist`}
                      component={Wishlist}
                    />
                    <ProtectedRoute
                      path={`${path}/order-manage`}
                      component={ManageOrder}
                    />
                    <ProtectedRoute
                      path={`${path}/product-manage`}
                      component={ManageProduct}
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
          </ToastProvider>
        </WithAxios>
      </div>
    </BrowserRouter>
  );
};

export default Router;
