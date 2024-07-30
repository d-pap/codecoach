import React from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { styled as muiStyled } from '@mui/material/styles';

const Item = muiStyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#DEF9C4' : '#468585',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',  // Prevent text from wrapping
}));

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  flex-wrap: nowrap;
`;

const NavLink = styled(Link)`
  color: #DEF9C4;
  text-decoration: none;
  padding: 0 10px;
  display: flex;
  align-items: center;
  white-space: nowrap;  // Prevent text from wrapping
  &.active {
    font-weight: bold;
    background-color: #50B498;  // Active background color
  }
`;

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  padding-right: 24px;  // Padding right for spacing
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: flex;
  align-items: center;
  white-space: nowrap;  // Prevent text from wrapping
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ flexWrap: 'nowrap' }} // Prevent wrapping in Stack
      >
        <Item><NavLink to="/about" activeClassName="active"><span>About</span></NavLink></Item>
        <Item><NavLink to="/problems" activeClassName="active"><span>Problems</span></NavLink></Item>
        <Item><NavLink to="/sign-up" activeClassName="active"><span>Sign Up</span></NavLink></Item>
        <Item><NavLink to="/addProblems" activeClassName="active"><span>Add Problems</span></NavLink></Item>
      </Stack>
      <NavBtnLink to="/signin">Sign In</NavBtnLink>
    </Nav>
  );
};

export default Navbar;
