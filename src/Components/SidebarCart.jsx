import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UserRequests from "../Requests/UserRequests";
import "../style/cartGallery.css";
import rupee from "../icons/rupee.svg";
import { Link } from "react-router-dom";
import SidebarCartCard from "./SidebarCartCard";
const SidebarCart = () => {  
  const userCart = useSelector((state) => state?.User?.usercart) || [];
  const userLocalCart = useSelector((state) => state?.User?.userLocalCart) || [];
  const user = useSelector((state) => state?.User?.user);
  const [total, setTotal] = useState();
  useEffect(() => {
    if(user){
      let amount = 0;
      userCart.map((item) => {
        amount += ((item?.quantity) * (item?.productId?.price))      
    })    
    setTotal(amount);
    }
  }, [userCart])
  useEffect(() => {
    if(!user){
      let amount = 0;
      userLocalCart.map((item) => {
        amount += item?.price;
      })
      setTotal(amount);      
    }
  }, [userLocalCart])
  
  return (
    <section className={false ? "cartGallery" : "cartGallery cartActive"}>
      <h4>Your Cart from</h4>
      <h1>D-Mart</h1>
      <Link to={"/checkout"}>
        <div className="checkoutBtn">
          <span>Checkout</span>
          <span>
            <img src={rupee} alt="" />
            <span>{total}</span>
          </span>
        </div>
      </Link>
      <hr />

      <div className="cartPropucts">          
          <SidebarCartCard/>
      </div>
    </section>
  );
};

export default SidebarCart;
