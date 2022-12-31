import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProductsAction, UserAction, UserCartAction } from "../Redux/Actions/Actions";
import UserRequests from "../Requests/UserRequests";
import Checkout from "../Pages/Checkout";
import Home from "../Pages/Home";
import axios from "axios";
import OrderSuccess from "../Components/OrderSucess";
import Page404 from "../Components/Page404";
import Order from "../Pages/Order";

const Routing = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.User?.user);
  const userId = localStorage.getItem("id");
  useLayoutEffect(() => {
    if (userId) {
      axios
        .get(UserRequests.GET_USER + userId)
        .then((res) => {
          dispatch(UserAction(res?.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    axios.get(UserRequests.GET_ALL_PRODUCTS).then((response) => {
      dispatch(ProductsAction(response.data));
    })
    }, []);
    useEffect(() => {
      axios.get(UserRequests.GET_USER_CART + user?._id)
        .then(response => {
          dispatch(UserCartAction(response.data?.cart))
        })
    }, [user])
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<Order />} />
            <Route path="/OrderPlaced" element={<OrderSuccess />} />
            <Route path="/404" element={ <Page404 /> } />
            <Route path="*" element={ <Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  };

  export default Routing;
