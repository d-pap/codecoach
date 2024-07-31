import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Button, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";

// Styled NavLink component using MUI
const NavLink = styled(Button)(({ theme }) => ({
  color: "#DEF9C4",
  textDecoration: "none",
  borderRadius: "10px",
  whiteSpace: "nowrap", // Prevent text wrapping
  "&:hover": {
    background: "#9CDBA6",
    color: "#468585",
  },
  "&.active": {
    color: "#DEF9C4",
    backgroundColor: "#50B498", // Active background color
  },
}));

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ borderBottom: "2px solid #468585", backgroundColor: "transparent" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", height: "85px" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
          <NavLink component={RouterLink} to="/about" activeClassName="active">About</NavLink>
          <NavLink component={RouterLink} to="/problems" activeClassName="active">Problems</NavLink>
          <NavLink component={RouterLink} to="/sign-up" activeClassName="active">Sign Up</NavLink>
          <NavLink component={RouterLink} to="/addProblems" activeClassName="active">Add Problems</NavLink>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
          <NavLink
            component={RouterLink}
            to="/signin"
            sx={{
              backgroundColor: "#50B498",
              padding: "10px 22px",
              marginLeft: "24px",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                background: "#9CDBA6",
                color: "#468585",
              },
            }}
          >
            Sign In
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
