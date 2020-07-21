import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'

const NavBar = (props) => {
    return(
        <div className="navbar">
            <Link to="/login">
                <div className="navlogo">
                    <img src={process.env.PUBLIC_URL + '/For_Dark_Bg.png'} alt="Logo" />
                </div>
            </Link>
            <Link className="navbutton" to="/login" onClick={() => props.onLogout()}>Log Out</Link>
            <Link className="navbutton" to="/login">Login</Link>
            <Link className="navbutton" to="/signup">Sign Up</Link>
            <Link className="navbutton" to="/profile">Profile</Link>
            <Link className="navbutton" to="/meets/create">Host A Meet</Link>
            <Link className="navbutton" to="/meets">Find A Meet</Link>
            <Link className="navbutton" to="/boardgames">Boardgames</Link>
        </div>
    )
}

export default NavBar;