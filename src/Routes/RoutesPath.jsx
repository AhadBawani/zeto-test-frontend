import React from 'react'
import MainStore from "../componants/MainStore";
import Checkout from "../componants/Checkout"
import {Routes,Route} from "react-router-dom"
import Footer from '../componants/Footer';

const RoutesPath = () => {
  return (
    <>
    <Routes>
        <Route  path="/" element={ <MainStore/>} />        
        <Route  path="/checkout" element={ <Checkout/>} />      
        <Route path='/successPayment' element={<Checkout/>}/>  
      </Routes>
      <Footer/>
    </>
  )
}

export default RoutesPath