import React, { useState } from 'react';
import { Nav, NavLink, NavLogo, DonateNavLink, Bars, NavMenu } from './NavBarElements';
import chat from '../../Images/chats.svg';
import user from '../../Images/user.svg';
import logo from '../../Images/logo.png';
import Heart from '../../Images/heart.svg';
import '../../App.css';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Nav className="navbar">
                <NavLogo to="/">
                    <img src={logo} style={{ width: 30, cursor: 'pointer', marginRight: 5 }} alt="GGD" />
                    <div style={{ cursor: 'pointer', color: '#3f7e44' }}>G</div>
                    <div style={{ cursor: 'pointer', color: '#0a97d9' }}>G</div>
                    <div style={{ cursor: 'pointer', color: '#56c02b' }}>D</div>
                    <div style={{ cursor: 'pointer', padding: '0 0.5vw 0 0.5vw' }}>|</div>
                    <div style={{ cursor: 'pointer' }}>Going Green Digital</div>
                </NavLogo>
                <Bars onClick={() => setIsOpen(!isOpen)} />
                <NavMenu isOpen={isOpen}>
                    <NavLink to="/news" >
                        News
                    </NavLink>
                    <NavLink to="/more-info" >
                        More Information
                    </NavLink>
                    <NavLink to="/actions" >
                        Actions
                    </NavLink>
                    <NavLink to="/carbon-footprint-calc" >
                        Carbon Footprint Calculator
                    </NavLink>
                    {props.loggedIn &&
                        <NavLink to="/chat">
                            <img src={chat} style={{ width: 25, cursor: 'pointer' }} alt="Chat" />
                        </NavLink>
                    }
                    {props.loggedIn &&
                        <NavLink to="/user-profile">
                            <img src={user} style={{ width: 20, cursor: 'pointer' }} alt="User" />
                        </NavLink>
                    }
                    {props.loggedIn &&
                        <NavLink to="/sign-out" >
                            Logout
                        </NavLink>
                    }
                    {!props.loggedIn &&
                        <NavLink to="/sign-in" >
                            Login
                        </NavLink>
                    }
                    {!props.loggedIn &&
                        <NavLink to="/sign-up" >
                            Register
                        </NavLink>
                    }
                    <DonateNavLink to="/donate" >
                        <img src={Heart} style={{ width: 20, marginRight: 6, cursor: 'pointer' }} alt="User" />
                        Donate
                    </DonateNavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default NavBar; 