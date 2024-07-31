import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import styled from 'styled-components'

// Main navbar container
const Nav = styled.nav`
  border-bottom: 2px solid #468585;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
`

// Styled NavLink component
const NavLink = styled(Link)`
  color: #def9c4;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  // height: 100%;
  cursor: pointer;
  border-radius: 10px;
  white-space: nowrap; // Prevent text wrapping
  &:hover {
    background: #9cdba6;
    color: #468585;
  }
  &.active {
    color: #def9c4;
    background-color: #50b498; // Active background color
  }
`

// Mobile menu icon styling
const Bars = styled.div`
  display: none;
  color: #def9c4;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`

// Container for navigation links
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

// Container for navigation buttons
const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

// Styled component for navigation button links
const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #50b498;
  padding: 10px 22px;
  color: #def9c4;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  white-space: nowrap; // Prevent text wrapping

  &:hover {
    background: #9cdba6;
    color: #468585;
  }
`

const Navbar = () => {
  return (
    <Nav>
      <Bars />
      <NavMenu>
        <NavLink to="/about" activeClassName="active">
          About
        </NavLink>
        <NavLink to="/problems" activeClassName="active">
          Problems
        </NavLink>
        <NavLink to="/sign-up" activeClassName="active">
          Sign Up
        </NavLink>
        <NavLink to="/addProblems" activeClassName="active">
          Add Problems
        </NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/signin">Sign In</NavBtnLink>
      </NavBtn>
    </Nav>
  )
}

export default Navbar
