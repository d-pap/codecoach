import React from 'react';
import Navbar from './NavCopy';
import styled from 'styled-components';

const HeaderSection = styled.header`
  width: 100%;
  background: #468585;
  height: auto;
  background-size: 100%;
  background-repeat: no-repeat;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const ProjectTitle = styled.h1`
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 5rem;
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
            <Navbar />
        </HeaderSection>
    );
};

export default Header;
