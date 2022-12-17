import "./css/store.css";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-scroll";
import { getData } from "../store/ApiCalls";
import { categoryToggle } from "../store/ToggleSlice";
import menu from "../icons/menu.svg";
import arrowR from "../icons/arrowR.png";
import arrowL from "../icons/arrowL.png";

// Componant import
import Product from "./Product";
import CategoryPopUp from "./CategoryPopUp";
import Loder from "./Loder";
import SignUpModel from "./SignUpModel";

const Store = () => {
  const [data, setdata] = useState([]);
  // redux work
  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.api);
  const cateToggle = useSelector((state) => state.toggleReducer.toggle);
  const model = useSelector((state) => state.toggleReducer.model);

  console.log(!cateToggle);
  useEffect(() => {
    dispatch(getData());
  }, []);
  const duplicateCheck = [];
  apiData.data &&
    apiData.data.map((item) => {
      if (duplicateCheck.includes(item.category)) return null;
      duplicateCheck.push(item.category);
      return data;
    });

  const filterCategory = (category, arr) => {
    return arr.filter((i) => {
      return i.category == category;
    });
  };

  // Category scroll
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <>
      <section className="store">
        <div className="stickOnTop">
          <div className="store_header">
            <h2>groceries</h2>
            <span>(we deliver same day)</span>
          </div>
          <div className="main__category">
            <img onClick={() => dispatch(categoryToggle())} src={menu} alt="" />
            <img onClick={() => scroll(-40)} src={arrowL} alt="p" />
            <div className="main__slider" ref={ref}>
              {duplicateCheck.map((item, i) => {
                return (
                  <Link
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={-140}
                    duration={300}
                    to={item}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
            <img onClick={() => scroll(40)} src={arrowR} alt="p" />
          </div>
        </div>
        {cateToggle ? <CategoryPopUp /> : ""}
        {model && <SignUpModel />}
        <div className="product__gallery">
          {apiData.isLoading && <Loder />}
          {apiData.isSuccess&&duplicateCheck.map((i) => {
            return (
              <>
                <div className="cat_header">
                  <h2 className={i}>{i}</h2>
                  <span>Fresh vegetables for good health.</span>
                </div>
                <div className="product_category_gallery">
                  {filterCategory(i, apiData.data).map((item, i) => {
                    return (
                      <Product
                        key={i}
                        id={item._id}
                        price={item.price}
                        mrp={item.mrp}
                        title={item.productName}
                        discount={item.discount}
                        desc={item.description}
                        img={item.productImage}
                      />
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Store;
