import React, { useEffect, useLayoutEffect } from 'react'
import {Link} from 'react-router-dom'
import "../style/header.css"
import logo from "../icons/logo.svg"
import axios from 'axios'
import UserRequests from '../Requests/UserRequests'
import { useDispatch, useSelector } from 'react-redux'
import { UserAction, UserCartAction } from '../Redux/Actions/Actions'
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