import React from 'react'
import {Link} from 'react-router-dom'
import "./css/header.css"
import logo from "../icons/logo.svg"
const CheackoutHeader = () => {
  return (
    <nav className="navbar">
        <Link to={"/"}>
        Back to Store
        </Link>
        <Link to={"/"}>
        <img src={logo} alt="" />
        </Link>
        <div className="nav_right">

        </div>
    </nav>
  )
}

export default CheackoutHeader