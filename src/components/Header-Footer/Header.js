import React from "react";
import Navbar from "./NavCopy";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled header section using MUI
const HeaderSection = styled(AppBar)(({ theme }) => ({
  background: "#468585",
  display: "flex",
  justifyContent: "space-between",
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  textAlign: "left",
  fontSize: "2rem",
  color: "#def9c4",
}));

const Header = () => {
  return (
    <HeaderSection position="static">
      <Toolbar sx={{ justifyContent: "space-between", width: "100%" }}>
        <TitleWrapper>
          <ProjectTitle variant="h1">Code Coach</ProjectTitle>
        </TitleWrapper>
        <Box sx={{ marginLeft: "auto" }}>
          <Navbar />
        </Box>
      </Toolbar>
    </HeaderSection>
  );
};

export default Header;
