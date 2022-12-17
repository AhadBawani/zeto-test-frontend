import React, { useState, useEffect } from "react";
import "./css/header.css";
import "./css/SignUpSignInBtn.css";
import { Link } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";
import { searchQuery } from "../store/productSlice";

import { ModelPopUp, cartToggle } from "../store/ToggleSlice";
import hamburger from "../icons/hamburger.png";
import close from "../icons/close.png";
import { getData } from "../store/ApiCalls";

import logo from "../icons/logo.svg";
import profile from "../icons/Profile.png";
import cartIcon from "../icons/cartIcon.svg";
const Header = () => {
  const [activeHamburger, setactiveHamburger] = useState(true);
  const [ProfileCard, setProfileCard] = useState(true);
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const model = useSelector((state) => state.toggleReducer.model);
  const apiData = useSelector((state) => state.api);
  const query = useSelector((state) => state.product.query);
  const user = useSelector((state) => state.UserSlice.user);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    dispatch(searchQuery(filter));
  }, [filter]);
  useEffect(() => {
    dispatch(getData());
  }, []);
  // filteration of product
  const filteredData = apiData.data.filter((item) => {
    return (
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query) ||
      item.productName.includes(query)
    );
  });
const Logout = ()=>{
  localStorage.removeItem("id");
  window.location.reload()
}
  return (
    <>
      <nav className="navbar">
        <div className="nav_left">
          <div className="hamburger">
            <img
              className=""
              src={activeHamburger ? hamburger : close}
              alt=""
              onClick={() => setactiveHamburger(!activeHamburger)}
            />
            <div
              className={
                activeHamburger
                  ? "hamburger__list activeHamburger"
                  : "hamburger__list"
              }
            >
              <Link>User</Link>
              <Link>Profile</Link>
              <Link>Order</Link>
              <Link>Privacy</Link>
              <Link>Contact Us</Link>
              <Link>About Us</Link>
            </div>
          </div>
          <img src={logo} alt="" />
        </div>
        <div className="nav_center">
          <input
            type="text"
            placeholder="Search Product..."
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
          />
          {query.length > 0 ? (
            <div className="searchCard">
              <ul>
                {filteredData
                  .map((item, i) => {
                    return (
                      <li key={i}>
                        <Link>{item.productName}</Link>
                      </li>
                    );
                  })
                  .slice(0, 10)}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="nav_right">
          {user ? (
            <div onClick={()=>setProfileCard(!ProfileCard)} className="userAfterLogin">
              <div className="login_logout flex">
                <span>{user?.username?.split(" ")[0]?.toUpperCase()}</span>
                <img src={profile} style={{ width: "30px" }} alt="" />
              </div>
              <div  className={ProfileCard?"navUser hide":"navUser"}>
                <ul>
                  <li><Link>Order</Link></li>
                  <li><Link>Profile</Link></li>
                  <li onClick={Logout}>Log Out</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="login_logout">
              <button
                onClick={() => dispatch(ModelPopUp("signIn"))}
                className={model ? "login " : "login loginActive"}
              >
                Sign In
              </button>
              <button
                onClick={() => dispatch(ModelPopUp("signUp"))}
                className={model ? "logout loginActive" : "logout "}
              >
                Sign Up
              </button>
            </div>
          )}

          <div onClick={() => dispatch(cartToggle())} className="cartBtn">
            <img src={cartIcon} alt="" />
            <strong>{totalQuantity}</strong>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
