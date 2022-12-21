import React from "react";
import "../style/categoryPopup.css";
import close from "../icons/close.png";
import { Link } from "react-scroll";
import { useDispatch } from "react-redux";
import { CategoryToggleBtnAction } from "../Redux/Actions/Actions";
const CategoryPopUp = ({ Category }) => {
  const dispatch = useDispatch()
  return (
    <>
      <div className="categoryPopup">
        <div className="popUpHeading">
          <h1>Full Item</h1>
          <img onClick={()=>dispatch(CategoryToggleBtnAction(false))} src={close} alt="" />
        </div>
        {Category &&
          Category.map((item) => {
            return (
              <>
                <div className="category__list">
                  <Link
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={-160}
                    duration={300}
                    to={item}
                    key={item}
                  >
                    {item}
                  </Link>
                  <span></span>
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
