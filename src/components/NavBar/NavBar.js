import React from 'react';
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import { LinkContainer } from "react-router-bootstrap";
import './style.css'

const NavBar = (props) => {
    return(
        <div className="padding">
            <Navbar fluid collapseOnSelect>
                <Link to="/login">
                    <div className="navlogo">
                        <img src={process.env.PUBLIC_URL + '/For_Dark_Bg.png'} alt="Logo" />
                    </div>
                </Link>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {localStorage.getItem("token") ? 
                            <LinkContainer to="/login" onClick={() => props.onLogout()}><NavItem className="navbutton">Log Out</NavItem></LinkContainer> 
                            : <LinkContainer to="/login"><NavItem className="navbutton">Log In</NavItem></LinkContainer>
                        }
                        {localStorage.getItem("token") ? 
                            null 
                            : <LinkContainer to="/signup"><NavItem className="navbutton">Sign Up</NavItem></LinkContainer>
                        }
                        {localStorage.getItem("token") ? 
                            <LinkContainer to="/profile"><NavItem className="navbutton">Profile</NavItem></LinkContainer> 
                            : null
                        }
                        {localStorage.getItem("token") ? 
                            <LinkContainer to="/meets/create"><NavItem className="navbutton">Host A Meet</NavItem></LinkContainer> 
                            : null
                            }
                        <LinkContainer to="/meets"><NavItem className="navbutton">Find A Meet</NavItem></LinkContainer>
                        <LinkContainer to="/boardgames"><NavItem className="navbutton">Boardgames</NavItem></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar;