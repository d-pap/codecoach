import React from 'react'
import Navbar from './NavCopy'
import styled from 'styled-components'

const HeaderSection = styled.header`
  background: #468585;
  // background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  // align-items: right;
  // padding: 20px;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  // align-items: center;
  width: 100%;
  border: 1px solid blue;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const ProjectTitle = styled.h1`
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: left;
  font-size: 2rem;
  color: #def9c4;
`

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
  )
}

export default Header
