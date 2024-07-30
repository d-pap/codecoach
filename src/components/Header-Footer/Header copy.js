import React from 'react';
import Navbar from './NavCopy';
import styled from 'styled-components';

const HeaderSection = styled.header`
  // width: 100%;
  background: #468585;
  height: auto;
  // background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ProjectTitle = styled.h1`
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: left;
  font-size: 2rem;
  color: #DEF9C4;
`;

const Header = () => {
  return (
    <HeaderSection>
      <HeaderContainer>
        <TitleWrapper>
          <ProjectTitle>Code Coach</ProjectTitle>
        </TitleWrapper>
      </HeaderContainer>
      <HeaderContainer>
        <Navbar />
      </HeaderContainer>
    </HeaderSection>
  );
};

export default Header;
