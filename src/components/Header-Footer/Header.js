import React from 'react';
// import Navbar from '../../Navbar';
import Navbar from './NavCopy';


import styled from 'styled-components';

const HeaderSection = styled.header`
  width: 100%;
  background: #808080;
  height: auto;
  background-size: 100%;
  background-repeat: no-repeat;
`;

const HeaderContainer = styled.div`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

const ProjectTitle = styled.h1`
  font-size: 5rem;
  color: #ffffff;
`;

const Header = () => {
  return (
    <HeaderSection>
      <HeaderContainer className="container">
        <ProjectTitle>Code Coach</ProjectTitle>
        
      </HeaderContainer>
      <Navbar />
    </HeaderSection>
  );
};

export default Header;
