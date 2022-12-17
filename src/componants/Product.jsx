import React from "react";
import "./css/product.css";
import rupeeB from "../icons/rupeeB.svg"
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
const Product = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="product">
        <div className="product__detail">
          <span className="product__name">{props.title}</span>
          <span className="product__desc">
            {props.desc}
          </span>
          <div className="product__price">
            <span>
              <span><img src={rupeeB} alt="" /></span> {props.mrp-(props.mrp*props.discount/100)}
            </span>
            <span>
              MRP <span>&#x20b9;{props.mrp}</span>
            </span>
            <span>{props.discount}% off</span>
          </div>
        </div>
        <img src={`http://localhost:5000/Images/${props.img}`} />
        <button onClick={() => dispatch(addItem({ id: props.id, title: props.title, img: props.img, desc: props.desc, price: props.price }))} className="addBtn">
          ADD
        </button>
      </div>
    </>
  );
};
export default Product;
