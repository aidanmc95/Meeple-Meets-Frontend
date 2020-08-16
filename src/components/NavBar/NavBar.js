import React from 'react';
import { Link } from 'react-router-dom'
import './style.css'

const NavBarNew = (props) => {
    return(
        <div className="navbar">
            <ul>
                <Link className="brand" to="/login">
                    <img src={process.env.PUBLIC_URL + '/For_Dark_Bg.png'} alt="Logo" />
                </Link>
                {localStorage.getItem("token") ? 
                    <li>
                        <Link to="/login" onClick={() => props.onLogout()}>Log Out</Link> 
                    </li>
                    : <li><Link to="/login">Log In</Link></li>
                }
                {localStorage.getItem("token") ? 
                    null 
                    : <li><Link to="/signup">Sign Up</Link></li>
                }
                {localStorage.getItem("token") ? 
                    <li><Link to="/profile">Profile</Link></li>
                    : null
                }
                {localStorage.getItem("token") ? 
                    <li><Link to="/meets/create">Host A Meet</Link></li>
                    : null
                }
                <li><Link to="/meets">Find A Meet</Link></li>
                <li><Link to="/boardgames">Boardgames</Link></li>
            </ul>
        </div>
    )
}

export default NavBarNew;