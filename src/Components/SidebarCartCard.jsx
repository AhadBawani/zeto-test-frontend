import React, { useEffect, useState } from "react";
import "../style/cartGallery.css";
import minus from "../icons/minus.png";
import deletei from "../icons/deletei.png";
import plus from "../icons/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import UserRequests from "../Requests/UserRequests";
import axios from "axios";
import { UserCartAction, UserLocalCartAction } from "../Redux/Actions/Actions";
const SidebarCartCard = () => {
  const userCart = useSelector((state) => state?.User?.usercart) || [];
  const user = useSelector((state) => state?.User?.user);
  const Products = useSelector((state) => state?.Products?.Products) || [];
  const root = useSelector((state) => state?.User);
  const userLocalCart = useSelector((state) => state?.User?.userLocalCart) || [];
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);
  const deleteCartItem = (response) => {
    if(user){
      axios.delete(UserRequests.DELETE_CART_ITEM + response)
      .then(response => {
        setChange(true);
      })
    }
    else{
      let index = userCart.findIndex((item) => item?.productId == response);
      userCart.splice(index, 1);
      localStorage.setItem('usercart', userCart);
      dispatch(UserLocalCartAction(userCart));      
    }    
  }
  const RemoveQuantity = (response) => {
    if (user) {
      axios.patch(UserRequests.REMOVE_CART_QUANTITY + response)
        .then((response) => {
          setChange(true)
        })
        .catch(error => {
          console.log(error)
        })
    }
    else{
      let userCart = JSON.parse(localStorage.getItem('usercart'));
      let index = userCart.findIndex((item) => item?.productId == response);
        if(index >= 0){
          let currentQuantity = userCart[index]?.quantity;
          let price = (userCart[index]?.price / currentQuantity);
          let obj = {
            productId:userCart[index]?.productId,
            quantity : (currentQuantity - 1),
            price: ((currentQuantity - 1) * price)
          }
          userCart[index] = obj;
        }
        localStorage.setItem('usercart', JSON.stringify(userCart));
        dispatch(UserLocalCartAction(userCart));
    }
  }
  const AddQuantity = (response) => {
    if (user) {
      axios.patch(UserRequests.ADD_CART_QUANTITY + response)
        .then(response => {
          setChange(true)
        })
        .catch(error => console.log(error))
    }
    else{
      let userCart = JSON.parse(localStorage.getItem('usercart'));
      let index = userCart.findIndex((item) => item?.productId == response);
        if(index >= 0){
          let currentQuantity = userCart[index]?.quantity;
          let price = (userCart[index]?.price / currentQuantity);
          let obj = {
            productId:userCart[index]?.productId,
            quantity : (currentQuantity + 1),
            price: ((currentQuantity + 1) * price)
          }
          userCart[index] = obj;
        }
        localStorage.setItem('usercart', JSON.stringify(userCart));
        dispatch(UserLocalCartAction(userCart));
    }
  }
  useEffect(() => {
    if (change) {
      axios
        .get(UserRequests.GET_USER_CART + user?._id)
        .then((response) => {
          dispatch(UserCartAction(response.data?.cart));
          setChange(false)
        })
        .catch((error) => { console.log(error) });
    }
  }, [change])
  return (
    <>
      {
        user
          ?
          <>
            {
              userCart.map((item) => {
                return <>
                  <div className="sidebar_cart_card">
                    <div className="cart__image">
                      <img alt="" src={UserRequests.PRODUCT_IMG + item?.productId?.productImage} />
                    </div>
                    <div className="cartCartDetail">
                      <span>{item?.productId?.productName}</span>
                      <div className="cart_product_quantity">
                        <strong>{item?.productId?.price}</strong>

                        <div className="increment">
                          {item?.quantity === 1 ? (
                            <img src={deletei} alt="" onClick={() => deleteCartItem(item?._id)} />
                          ) : (
                            <img src={minus} alt="" onClick={() => RemoveQuantity(item?._id)} />
                          )}
                          <span>{item?.quantity}</span>
                          <img src={plus} alt="" onClick={() => AddQuantity(item?._id)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              })
            }
          </>
          :
          <>
            {
              userLocalCart.map(items => {
                let item = Products?.find((result) => result?._id == items?.productId)
                return <>
                  <div className="sidebar_cart_card">
                    <div className="cart__image">
                      <img alt="" src={UserRequests.PRODUCT_IMG + item?.productImage} />
                    </div>
                    <div className="cartCartDetail">
                      <span>{item?.productName}</span>
                      <div className="cart_product_quantity">
                        <strong>{item?.price}</strong>

                        <div className="increment">
                          {items?.quantity === 1 ? (
                            <img src={deletei} alt="" onClick={() => deleteCartItem(item?._id)} />
                          ) : (
                            <img src={minus} alt="" onClick={() => RemoveQuantity(item?._id)} />
                          )}
                          <span>{items?.quantity}</span>
                          <img src={plus} alt="" onClick={() => AddQuantity(item?._id)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              })                            
            }
          </>
      }
    </>
  );
};

export default SidebarCartCard;
