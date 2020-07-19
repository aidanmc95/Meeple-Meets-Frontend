import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'

const NavBar = (props) => {
    return(
        <div className="navbar">
            <img src="../../../public/For_Dark_Bg2.jpg" alt="Logo"></img>
            <Link className="navbutton" to="/login">Login</Link>
        </div>
    )
}

export default NavBar;