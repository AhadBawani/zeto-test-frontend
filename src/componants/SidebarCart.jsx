import React, { useEffect } from "react";
import "./css/cartGallery.css";
import rupee from "../icons/rupee.svg";
import SidebarCartCard from "./SidebarCartCard";
import EmptyCart from "./EmptyCart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const SidebarCart = () => {
  const [userCart,setuserCart] = useState([])
  const cart = useSelector((state) => state.cart);
  const cartToggle = useSelector((state) => state.toggleReducer.cartToggle);
  const user = useSelector((state) => state.UserSlice.user);
  useEffect(() => {
    console.log(user);
    axios
      .get(`http://52.66.195.69:5000/UserCart/${user?._id}`)
      .then((res) => {
        setuserCart(res.data.cart)
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [user]);
  return (
    <section className={cartToggle ? "cartGallery" : "cartGallery cartActive"}>
      <h4>Your Cart from</h4>
      <h1>D-Mart</h1>
      <Link to={"/checkout"}>
        <div className="checkoutBtn">
          <span>Checkout</span>
          <span>
            <img src={rupee} alt="" />
            <span>{cart.totalAmount}</span>
          </span>
        </div>
      </Link>
      <hr />

      <div className="cartPropucts">
        {cart.cartItems.length <= 0&&
          <EmptyCart />
         
        }{        
        user&&userCart ? (
          <>
            {userCart.map((i, j) => {
              return <SidebarCartCard key={j} cartItems={i} />;
            })}
          </>
        ) : (
          cart.cartItems.map((i, j) => {
            return <SidebarCartCard key={j} cartItems={i} />;
          })
        )}
      </div>
    </section>
  );
};

export default SidebarCart;
