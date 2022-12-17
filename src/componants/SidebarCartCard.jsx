import React from "react";
import { useDispatch } from "react-redux";
import "./css/cartGallery.css";
import minus from "../icons/minus.png";
import deletei from "../icons/deletei.png";
import plus from "../icons/plus.svg";
import { addItem, removeItem } from "../store/cartSlice";
import { useSelector } from "react-redux";

const SidebarCartCard = ({ cartItems }) => {
  const user = useSelector((state) => state.UserSlice.user);
  console.log(cartItems);
  const dispatch = useDispatch();
  return (
    <>
      <div className="sidebar_cart_card">
        <div className="cart__image">
          <img
            src={`http://52.66.195.69:5000/Images/${cartItems?.productId.productImage}`}
            alt=""
          />
        </div>
        {user ? (
          <div className="cartCartDetail">
            <span>{cartItems.productId.productName}</span>
            <div className="cart_product_quantity">
              <strong>{Math.ceil(cartItems.productId.price)}</strong>

              <div className="increment">
                {cartItems.quantity === 1 ? (
                  <img
                    onClick={() => dispatch(removeItem(cartItems.id))}
                    src={deletei}
                    alt=""
                  />
                ) : (
                  <img
                    onClick={() => dispatch(removeItem(cartItems.id))}
                    src={minus}
                    alt=""
                  />
                )}
                <span>{cartItems.quantity}</span>
                <img
                  onClick={() => dispatch(addItem({ id: cartItems._id }))}
                  src={plus}
                  alt=""
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="cartCartDetail">
            <span>{cartItems?.productImage}</span>
            <div className="cart_product_quantity">
              <strong>{Math.ceil(cartItems.price)}</strong>

              <div className="increment">
                {cartItems.quantity === 1 ? (
                  <img
                    onClick={() => dispatch(removeItem(cartItems.id))}
                    src={deletei}
                    alt=""
                  />
                ) : (
                  <img
                    onClick={() => dispatch(removeItem(cartItems.id))}
                    src={minus}
                    alt=""
                  />
                )}
                <span>{cartItems.quantity}</span>
                <img
                  onClick={() => dispatch(addItem({ id: cartItems.id }))}
                  src={plus}
                  alt=""
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarCartCard;
