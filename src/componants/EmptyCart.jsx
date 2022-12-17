import React from 'react'
import emptyCart from "../icons/emptyCart.svg";
const EmptyCart = () => {
  const cart = {
    width:"220px",
  }
  return (
    <>
    <div style={{height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",paddingBottom:"20rem",alignItems:"center"}}  className="emptyCart">
        <img style={cart} src={emptyCart} alt="" />
        <span>Your Cart is Empty</span>
        <span>Add Item to get Started</span>
    </div>
    </>
  )
}

export default EmptyCart