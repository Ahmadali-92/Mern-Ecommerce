import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/layout/Header/Navbar.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import About from "./component/layout/About.js";
import Content from "./component/layout/Content.js";
import Products from "./component/Product/Products.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import webFont from "webfontloader";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgetPassword from "./component/User/ForgetPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
// import ProtectRoute from "./Route/ProtectRoute.js";
// import dotenv from "dotenv";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  // stripe API KEY
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    let { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Ubuntu"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  //not inspect
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} />
        <Elements stripe={loadStripe(stripeApiKey)}>
          {isAuthenticated && <UserOptions user={user} />}
          <Routes>
            <Route caseSensitive={false} path="/" element={<Home />} />
            <Route
              caseSensitive={false}
              path="/product/:id"
              element={<ProductDetails />}
            />
            <Route
              caseSensitive={false}
              path="/products"
              element={<Products />}
            />
            <Route path="/products/:keyword" element={<Products />} />
            <Route caseSensitive={false} path="/about" element={<About />} />
            <Route
              caseSensitive={false}
              path="/content"
              element={<Content />}
            />
            <Route caseSensitive={false} path="/search" element={<Search />} />
            {/* <Route
            caseSensitive={false}
            path="/account"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectRoute>
            }
          /> */}

            <Route
              caseSensitive={false}
              path="/account"
              element={isAuthenticated ? <Profile /> : <LoginSignUp />}
            />

            <Route
              caseSensitive={false}
              path="/me/update"
              element={isAuthenticated ? <UpdateProfile /> : <LoginSignUp />}
            />
            <Route
              caseSensitive={false}
              path="/password/update"
              element={isAuthenticated ? <UpdatePassword /> : <LoginSignUp />}
            />
            <Route
              caseSensitive={false}
              path="/password/forget"
              element={<ForgetPassword />}
            />
            <Route
              caseSensitive={false}
              path="/password/reset/:token"
              element={<ResetPassword />}
            />

            <Route
              caseSensitive={false}
              path="/login"
              element={<LoginSignUp />}
            />
            <Route caseSensitive={false} path="/cart" element={<Cart />} />
            <Route
              caseSensitive={false}
              path="/login/shipping"
              element={isAuthenticated ? <Shipping /> : <LoginSignUp />}
            />
            <Route
              caseSensitive={false}
              path="/order/confirm"
              element={isAuthenticated ? <ConfirmOrder /> : <LoginSignUp />}
            />
            {stripeApiKey && (
              <Route
                caseSensitive={false}
                path="/process/payment"
                element={
                  // <Elements stripe={loadStripe(process.env.STRIPE_API_KEY)}>
                  isAuthenticated ? <Payment /> : <LoginSignUp />
                  // <Elements/>
                }
              />
            )}

            <Route
              caseSensitive={false}
              path="/success"
              element={isAuthenticated ? <OrderSuccess /> : <LoginSignUp />}
            />
            <Route
              caseSensitive={false}
              path="/orders"
              element={isAuthenticated ? <MyOrders /> : <LoginSignUp />}
            />

            <Route
              caseSensitive={false}
              path="/order/:id"
              element={isAuthenticated ? <OrderDetails /> : <LoginSignUp />}
            />
            {/*Adimn dashboard */}
            <Route
              caseSensitive={false}
              path="/admin/dashboard"
              element={
                isAuthenticated && user.role === "admin" ? (
                  <Dashboard />
                ) : (
                  <LoginSignUp />
                )
              }
            />
            <Route
              caseSensitive={false}
              path="/admin/products"
              element={
                isAuthenticated && user.role === "admin" ? (
                  <ProductList />
                ) : (
                  <LoginSignUp />
                )
              }
            />
            <Route
              caseSensitive={false}
              path="/admin/product"
              element={
                isAuthenticated && user.role === "admin" ? (
                  <NewProduct />
                ) : (
                  <LoginSignUp />
                )
              }
            />
            <Route
              caseSensitive={false}
              path="/admin/product/:id"
              element={
                isAuthenticated && user.role === "admin" ? (
                  <UpdateProduct />
                ) : (
                  <LoginSignUp />
                )
              }
            />
            {/* admin orders */}
            <Route
              caseSensitive={false}
              path="/admin/orders"
              element={
                isAuthenticated && user.role === "admin" ? (
                  <OrderList />
                ) : (
                  <LoginSignUp />
                )
              }
            />
            <Route
              caseSensitive={false}
              path="/admin/order/:id"
              element={
                isAuthenticated && user.role === "admin" ? (
                  <ProcessOrder />
                ) : (
                  <LoginSignUp />
                )
              }
            />
            {/* users (admin) */}
            <Route
              caseSensitive={false}
              path="/admin/users"
              element={
                isAuthenticated && user.role === "admin" ? (
                  <UsersList />
                ) : (
                  <LoginSignUp />
                )
              }
            />
            <Route
              caseSensitive={false}
              path="/admin/user/:id"
              element={
                isAuthenticated && user.role === "admin" ? (
                  <UpdateUser />
                ) : (
                  <LoginSignUp />
                )
              }
            />
            <Route
              caseSensitive={false}
              path="/admin/reviews"
              element={
                isAuthenticated && user.role === "admin" ? (
                  <ProductReviews />
                ) : (
                  <LoginSignUp />
                )
              }
            />
          </Routes>
        </Elements>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
// npm uninstall react-material-ui-carousel --legacy-peer-deps  etc...
