import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { ModelPopUp } from "../store/ToggleSlice";
import { signUpModelToggle } from "../store/ToggleSlice";
import axios from "axios";
import "./css/SignUpModel.css";
import { userAction } from "../store/USerSlice";
const SignUpModel = () => {
  const dispatch = useDispatch();
  const signUpToggle = useSelector((state) => state.toggleReducer.signIn);
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  let name, val;

  const loginInputhandler = (e) => {
    name = e.target.name;
    val = e.target.value;
    setUser({ ...user, [name]: val });
  };

  const inputhandler = (e) => {
    name = e.target.name;
    val = e.target.value;
    setUser({ ...user, [name]: val });
  };

  const Login = (e) => {
    e.preventDefault();

    if (user.mobile === "") toast.error("Enter Your Email");
    else if (user.password.length < 5) toast.error("Enter valid Password");
    else {
      axios
        .post(`User/Login`, {
          phoneNumber: user.mobile,
          password: user.password,
        })
        .then((res) => {
          localStorage.setItem("id", res.data._id);
          dispatch(userAction(res.data));
          const userId = res.data._id;
          console.log(userId, "userid");
          const items =
            localStorage.getItem("cartItems") !== null
              ? JSON.parse(localStorage.getItem("cartItems"))
              : [];
          console.log(items);
          items.map((item) => {
            axios
              .post("UserCart", {
                userId: userId,
                productId: item.id,
                quantity: item.quantity,
              })
              .then((res) => {
                console.log("called");
              })
              .catch((err) => {
                console.log("dfsldakfsdhfsdalk");
                console.log(err);
              });
          });
          toast.success("Login successfully");
          dispatch(ModelPopUp(false));
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  const signUp = (e) => {
    e.preventDefault();
    if (user.name === "") toast.error("Enter Your Name please");
    else if (user.email === "") toast.error("Enter Your Email");
    else if (user.mobile === "") toast.error("Enter Your Email");
    else if (user.password.length < 5) toast.error("Enter Your valid Password");
    else if (user.password !== user.confirmPassword) {
      console.log(user.password, user.confirmPassword);
      toast.error("Password should be same");
    } else {
      axios
        .post("User/Signup", {
          username: user.name,
          email: user.email,
          phoneNumber: user.mobile,
          password: user.password,
          type:"user"
        })
        .then((res) => {
          console.log(res)
          localStorage.setItem("id", res.data.user._id);
          dispatch(userAction(res.data.user));
          const userId = res.data.user._id;
          const items =
            localStorage.getItem("cartItems") !== null
              ? JSON.parse(localStorage.getItem("cartItems"))
              : [];
          console.log(items);
          items.map((item) => {
            axios
              .post("UserCart", {
                userId: userId,
                productId: item.id,
                quantity: item.quantity,

              })
              .then((res) => {
                console.log("called");
              })
              .catch((err) => {
                console.log("dfsldakfsdhfsdalk");
                console.log(err);
              });
          });
          dispatch(ModelPopUp(false));
          toast.success("signup successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <>
      <div className="signInMdel">
        <div className="checkput__form">
          <div className="login_logout">
            <button
              className={signUpToggle ? "login loginActive " : "login "}
              onClick={() => dispatch(signUpModelToggle(true))}
            >
              Sign In
            </button>
            <button
              className={signUpToggle ? "logout " : "logout loginActive"}
              onClick={() => dispatch(signUpModelToggle(false))}
            >
              Sign Up
            </button>
          </div>
          <div className="form_class">
            {signUpToggle ? (
              <form>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Enter Your Mobile Number"
                  value={user.mobile}
                  onChange={loginInputhandler}
                />
                <input
                  type="password"
                  name="password"
                  id=""
                  placeholder="Enter Your Password"
                  value={user.password}
                  onChange={loginInputhandler}
                />
                <button onClick={Login}> Log in</button>
              </form>
            ) : (
              <form>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={user.name}
                  onChange={inputhandler}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={user.email}
                  onChange={inputhandler}
                />
                <input
                  type="number"
                  name="mobile"
                  id=""
                  placeholder="Enter Your Mobile Number"
                  value={user.mobile}
                  onChange={inputhandler}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Enter Your password"
                  value={user.password}
                  onChange={inputhandler}
                />
                <input
                  name="confirmPassword"
                  type="password"
                  id=""
                  placeholder="Confirm Your Password"
                  value={user.confirmPassword}
                  onChange={inputhandler}
                />
                <button onClick={signUp}> SignUp</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default SignUpModel;
