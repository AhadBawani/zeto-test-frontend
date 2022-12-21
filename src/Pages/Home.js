import axios from "axios";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import "../style/home.css";
import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";
import SignUpDialog from "../Components/SignUpDialog";
import {
  ProductsAction,
  UserCartAction,
  CategoryToggleBtnAction,
  UserLocalCartAction,
} from "../Redux/Actions/Actions";
import UserRequests from "../Requests/UserRequests";
import arrowR from "../icons/arrowR.png";
import menu from "../icons/menu.svg";
import arrowL from "../icons/arrowL.png";
import ProductCard from "../Components/ProductCard";
import SidebarCart from "../Components/SidebarCart";
import Footer from "../Components/Footer";
import CategoryPopUp from "../Components/CategoryPopUp";

const Home = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const user = useSelector((state) => state?.User?.user);
  const Products = useSelector((state) => state.Products?.Products) || [];
  const SignUpPopUp = useSelector((state) => state?.Toggle?.SignUpDialog);
  const categoryToggle = useSelector((state) => state?.Toggle?.CategoryPopUp);
  let userCart = localStorage.getItem("usercart");
  useEffect(() => {
    if (!user) {
      if (!(userCart == null || userCart.length == 0)) {
        let arr = [];
        let userCart = JSON.parse(localStorage.getItem("usercart"));
        userCart.map((item) => {
          let obj = {
            productId: item?.productId,
            quantity: item?.quantity,
            price: item?.price,
          };
          arr.push(obj);
        });
        dispatch(UserLocalCartAction(arr));
      }
    }
  }, []);

  // useLayoutEffect(() => {
  // }, [user])

  useEffect(() => {
    if (user) {
      if (!(userCart == null || userCart.length == 0)) {
        let userCart = JSON.parse(localStorage.getItem("usercart"));
        userCart.map((item) => {
          let obj = {
            userId: user?._id,
            productId: item?.productId,
            quantity: item?.quantity,
          };
          axios
            .post(UserRequests.ADD_TO_CART, obj)
            .then((response) => {
              axios
                .get(UserRequests.GET_USER_CART + user?._id)
                .then((response) => {
                  dispatch(UserCartAction(response.data?.cart));
                  localStorage.removeItem("usercart");
                  dispatch(UserLocalCartAction(null));
                })
                .catch((error) => {});
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    }
  }, [user]);

  const UniqueCategory = [];
  Products.map((item) => {
    if (UniqueCategory.includes(item.category)) return null;
    return UniqueCategory.push(item.category);
  });
  const filterData = (product, category) => {
    return product.filter((i) => {
      return i.category == category;
    });
  };
 

  return (
    <>
      <div className="Homapage">
        <Header />
        <section className="main_home">
          <section className="home">
            <div className="stickOnTop">
              {categoryToggle && <CategoryPopUp Category={UniqueCategory} />}
              <div className="home_header">
                <h2>groceries</h2>
                <span>(we deliver same day)</span>
              </div>
              <div className="main__category">
                <img
                  onClick={() => dispatch(CategoryToggleBtnAction(true))}
                  src={menu}
                  alt=""
                />
                <img src={arrowL} alt="p" />
                <div className="main__slider" ref={ref}>
                  {UniqueCategory.map((item) => {
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
                <img src={arrowR} alt="p" />
              </div>
            </div>

            {Products.length === 0 && "loading"}
            {SignUpPopUp && <SignUpDialog />}
            <div className="product__gallery">
              {UniqueCategory.map((i) => {
                return (
                  <>
                    <div className="cat_header">
                      <h2 className={i}>{i}</h2>
                      <span>Fresh vegetables for good health.</span>
                    </div>
                    <div className="product_category_gallery">
                      {filterData(Products, i).map((product) => {
                       return <ProductCard cartData = {product}/>;
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          </section>
          <SidebarCart />
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;
// ese matt kEO
