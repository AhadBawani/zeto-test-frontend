import React, { useEffect, useState } from "react";
import CheackoutHeader from "./CheackoutHeader";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./css/checkout.css";
import SignUpModel from "./SignUpModel";
import { Navigate } from "react-router-dom";

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}


const Checkout = () => {
  const signUpToggle = useSelector((state) => state.toggleReducer.signIn);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserSlice.user);
  console.log(user)
  const cartItem = useSelector((state) => state.cart);
  console.log(user)
  const [phoneNumber, setphoneNumber] = useState(user.phoneNumber);

  const phoneChangeHandler = (id) => {
      if(false){
      }else {
        axios
          .patch(`User/${user._id}`, {
            phoneNumber: phoneNumber,
          })
          .then((res) => {
            toast.success("Number Edited Succesfully",res)
          })
          .catch((err) => {
            toast.error(err.message)
          });
      }

  };



	const [name, setName] = useState('Ahad')
	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
		axios.post('Payment', {
			amount:cartItem.totalAmount
		})
			.then(response => {
				console.log(response)
				const options = {
					key: 'rzp_live_e9qbydMHEkjESM',
					currency: response.data.currency,
					amount: response.data.amount,
					order_id: response.data.id,
					name: 'Donation',
					description: 'Thank you for nothing. Please give us some money',
					handler: function (response) { 
						if(response.razorpay_payment_id){
             
            }
						alert(response.razorpay_order_id)
						alert(response.razorpay_signature)
					},
					prefill: {
						name,
						email: 'sdfdsjfh2@ndsfdf.com',
						phone_number: '9899999999'
					}
				}
				const paymentObject = new window.Razorpay(options)
				paymentObject.open()
			})
			.catch((error) => {
        <Navigate replace to="/successPayment" />;
				console.log(error);
			})
	
	}




  return (
    <>
      <CheackoutHeader />
      <div className="checkout__page ">
        <div className="check__left">
          {!user ? (
            <div className="checkout__card">
              <h2>1.Account Details</h2>
              <SignUpModel />
            </div>
          ) : (
            <div className="checkout__card c__signIn">
              <h2>1.Account Details</h2>
              <h3>{user.username?.toUpperCase()}</h3>
            </div>
          )}
          <div className="checkout__card">
            <h2>2.Shipping Details</h2>
            <div className="checkout__shipping">
              <details>
                <summary>Marwadi University</summary>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum,
                voluptas!
              </details>
              <details>
                <summary>Hostel ground Floor</summary>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum,
                voluptas!
              </details>
              <details>
                <summary>{user.phoneNumber}</summary>
                <form className="MobileChangeForm">
                  <input
                    type="number"
                    onChange={(e) => setphoneNumber(e.target.value)}
                    value={phoneNumber}
                  />
                  <input
                    type="button"
                    value="Update"
                    onClick={phoneChangeHandler}
                  />
                </form>
              </details>
            </div>
          </div>
          <div className="checkout__card">
            <h2>3.Payment Details</h2>
            <div className="checkout__shipping">
              <details>
                <summary>Debit Card</summary>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum,
                voluptas!
              </details>
              <details>
                <summary>Upi</summary>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum,
                voluptas!
              </details>
              <form
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 1.2rem",
                  paddingLeft: "2.3rem",
                }}
              >
                <label htmlFor="checkbox">Cash on delivery</label>
                <input type="checkbox" name="cod" id="checkbox" />
              </form>
            </div>
          </div>
          <div className="checkoutBtn resMob" onClick={displayRazorpay}>
            <span>Checkout</span>
            <span>{cartItem.totalAmount}</span>
          </div>
        </div>
        <div className="checkout__right">
          <div className="ch__btn">
            <div className="checkoutBtn resMob">
              <span>Checkout</span>
              <span>{cartItem.totalAmount}</span>
            </div>
            <details>
              <summary>Order Summary ({cartItem.totalQuantity})</summary>
              {cartItem.cartItems.map((item) => (
                <div className="sub_payment">
                  <span>{item.title}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </details>
          </div>
          <div className="payment" onClick={displayRazorpay}>
            <div className="sub_payment">
              <span>Subtotal</span>
              <span>{cartItem.totalAmount}</span>
            </div>
            <div className="sub_payment">
              <span>delivery Fee</span>
              <span>30</span>
            </div>
          </div>
          <div className="payment" >
            <div onClick={displayRazorpay} style={{ fontWeight: "600" }} className="sub_payment">
              <span>Total</span>
              <span>{cartItem.totalAmount + 30}</span>
            </div>
          </div>
        </div>
        <div onClick={displayRazorpay} className="checkoutBtnMobile">
          <span>Checkout</span>
          <span>{cartItem.totalAmount + 30}</span>
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

export default Checkout;
