import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import {FaBars} from "react-icons/fa";

export const Nav = styled.nav`
    font-weight: bold;
    z-index: 999;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    align-items: flex-start;
    margin: 0;
    width: 100%;
    padding: 7px 20px;
    justify-content: space-between;
    padding: 1rem calc ((100vw - 1000px) / 2);
    box-sizing: border-box;
    background: #ffffff40;
    backdrop-filter: blur( 30px );
    -webkit-backdrop-filter: blur( 30px );
    `

export const NavLink = styled(Link) `
    color: #76797B;
    display: flex; 
    align-items: center;
    text-decoration: none;
    padding: 0.7rem;
    height: 100%;
    cursor: pointer;
    overflow-y: hidden;
    transition: all 0.2s ease-in-out;
    }   

    &.active {
        color:#124512;
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.4);
        border-bottom: 2px solid #124512;
        border-radius: 0;
        backdrop-filter: blur( 7px );
        -webkit-backdrop-filter: blur( 7px );
    }
    &:hover {
        transition: all 0.2s ease-in-out;
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.4);
        color: #124512;
        background-color: #F0F0F0;
        border-radius: 30px;
    }
`
export const NavLogo = styled(Link) `
    padding: 0.9vh;
    color: #76797B;
    display: flex; 
    font-size: 1.2rem;
    align-items: center;
    text-decoration: none;
    padding: 0.7rem;
    height: 100%;
    cursor: pointer;
    overflow-y: hidden;
    transition: all 0.2s ease-in-out;
    }   
    &:hover {
        transition: all 0.2s ease-in-out;
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.4);
        color: #124512;
        background-color: #F0F0F0;
        border-radius: 30px;
    }
`

export const DonateNavLink = styled(Link) `
    color: white;
    background-color: red;
    display: flex; 
    align-items: center;
    text-decoration: none;
    padding: 0.7rem;
    height: 100%;
    cursor: pointer;
    overflow-y: hidden;
    transition: all 0.2s ease-in-out;
    border-radius: 30px;
    }   

    &.active {
        color: white;
        background-color: red;
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.4);
        border-bottom: 2px solid #660000;
        border-radius: 0;
        backdrop-filter: blur( 7px );
        -webkit-backdrop-filter: blur( 7px );
    }
    &:hover {
        transition: all 0.2s ease-in-out;
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.4);
        color: white;
        background-color: red;
        border-radius: 30px;
    }
`
export const Bars = styled(FaBars)`
    display:none;
    color: #76797B;

    @media screen AND (max-width: 1100px) {
        display: flex; 
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }

`

export const NavMenu = styled.div`
    display: inline-flex;
    justify-content: space-between
    align-items: center;
    position relatve;

    @media screen and (max-width: 1100px) {
        display: flex;
        overflow: hidden;
        flex-direction: column;
        width: 100%;
        max-height: ${({isOpen}) => (isOpen ? "300px" : "0")};
        transition: max-height 0.3s ease-in;
    }
`

export const NavBtn = styled.nav`
    display: flex; 
    align-items: center;
    margin-right: 24px;

    @media screen and (max-width 1100px) {
        display: none; 
    }
` 

export const NavBtnLink = styled(Link)`
    border-radius : 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-left: 24px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`