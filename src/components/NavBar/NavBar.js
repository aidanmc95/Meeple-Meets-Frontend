import React from 'react';
import { Link } from 'react-router-dom'
// import Example from '../Example/Example'
import './style.css'

const NavBar = (props) => {
    return(
        <div className="padding">
            <div className="navbar">
                <Link to="/login">
                    <div className="navlogo">
                        <img src={process.env.PUBLIC_URL + '/For_Dark_Bg.png'} alt="Logo" />
                    </div>
                </Link>
                {localStorage.getItem("token") ? 
                    <Link to="/login" className="navbutton" onClick={() => props.onLogout()}>Log Out</Link> 
                    : <Link to="/login" className="navbutton">Log In</Link>
                }
                {localStorage.getItem("token") ? 
                    null 
                    : <Link to="/signup" className="navbutton">Sign Up</Link>
                }
                {localStorage.getItem("token") ? 
                    <Link to="/profile" className="navbutton">Profile</Link> 
                    : null
                }
                {localStorage.getItem("token") ? 
                    <Link to="/meets/create" className="navbutton">Host A Meet</Link> 
                    : null
                    }
                <Link to="/meets" className="navbutton">Find A Meet</Link>
                <Link className="navbutton" to="/boardgames">Boardgames</Link>
            </div>
        </div>
    )
}

export default NavBar;