import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.footer`
  width: 100%;
  background-color: #468585;
  padding: 90px 0;
  color: #b6b6b6;
`;

const FooterContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 20px;
`;

const InformationText = styled.h3`
  color: #DEF9C4;
  margin-right: 20px;
`;

const CallText = styled.p`
  color: #b6b6b6;
  margin-right: 20px;

  a {
    color: #b6b6b6;
    text-decoration: none;

    &:hover {
      color: #878686;
    }
  }
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;

    li {
      margin-left: 10px; 
      a {
        color: #b6b6b6;
        text-decoration: none;
        transition: color 0.3s ease;
        &:hover {
          color: #878686;
        }
      img {
        width: 20px;
        height: 20px;
      }

    }
  }
`;

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <Column>
          <div>
            <InformationText>Contact Us</InformationText>
            <CallText><a href="#">+01 1234567890</a></CallText>
            <CallText><a href="#">+01 9876543210</a></CallText>
            <CallText><a href="#">demo@gmail.com</a></CallText>
          </div>
          <SocialIcon>
            <ul>
              <li><a href="#"><img src="icons/fb-icon.png" alt="Facebook" /></a></li>
              <li><a href="#"><img src="icons/twitter-icon.png" alt="Twitter" /></a></li>
              <li><a href="#"><img src="icons/linkedin-icon.png" alt="LinkedIn" /></a></li>
              <li><a href="#"><img src="icons/instagram-icon.png" alt="Instagram" /></a></li>
            </ul>
          </SocialIcon>
        </Column>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;
