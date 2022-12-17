import React from 'react'
import { categoryToggle } from "../store/ToggleSlice";
import Header from './Header'
import { useDispatch } from 'react-redux';
import "./css/mainStore.css"
import SidebarCart from './SidebarCart'
import Store from './Store'
const MainStore = () => {
  const dispatch = useDispatch();
  return (
    <div className="Homapage">
      <Header />
      <section className="main_store" >
        <Store />
        <SidebarCart />
      </section>
    </div>
  )
}

export default MainStore