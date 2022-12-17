import React from "react";
import "./css/categoryPopup.css";
import { useSelector, useDispatch } from "react-redux";
import { categoryToggle } from "../store/ToggleSlice";
import { useState } from "react";
import close from "../icons/close.png"
import { Link } from "react-scroll";
const CategoryPopUp = () => {
  const apiData = useSelector((state) => state.api);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  console.log(apiData);
  const duplicateCheck = [];
  apiData.data &&
    apiData.data.map((item) => {
      if (duplicateCheck.includes(item.category)) return null;
      duplicateCheck.push(item.category);
      return data;
    });
  console.log(duplicateCheck);
  return (
    <>
      <div className="categoryPopup">
        <div className="popUpHeading">
        <h1>Full Item</h1>
        <img onClick={()=>dispatch(categoryToggle())} src={close} alt="" />
        </div>
        {duplicateCheck.map((item) => {
          return (
            <>
              <div className="category__list">
                <Link activeClass="active"  spy={true} smooth={true} offset={-160} duration={300} to={item} key={item}>{item}</Link>
                <span>
                  {
                    apiData.data.filter((i) => {
                      return i.category == item;
                    }).length
                  }
                </span>
              </div>
            </>
          );
        })}
        <span></span>
      </div>
    </>
  );
};

export default CategoryPopUp;
