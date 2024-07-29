import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
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
    color: #9CDBA6;
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
        color: #9CDBA6;
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
                        <CallText><a tel="01 1234567890">+01 1234567890</a></CallText>
                        <CallText><a tel="01 9876543210">+01 9876543210</a></CallText>
                        <CallText><a mailto="demo@gmail.com">demo@gmail.com</a></CallText>
                    </div>
                    <SocialIcon>
                        <ul>
                            <li><a href="#"><FacebookIcon /> Facebook</a></li>
                            <li><a href="#"><TwitterIcon /> Twitter</a></li>
                            <li><a href="#"><LinkedInIcon /> LinkedIn</a></li>
                            <li><a href="#"><InstagramIcon /> Instagram</a></li>
                        </ul>
                    </SocialIcon>
                </Column>
            </FooterContainer>
        </FooterSection>
    );
};

export default Footer;


// const SocialIcon = styled.div`
//   ul {\
//     margin: 0;\
//     padding: 0;\
//     list-style: none;\
//     display: flex;\
//     flex-direction: column;\
//     li {\
//       margin: 10px 0;\
//       a {\
//         display: flex;\
//         align-items: center;\
//         color: #b6b6b6;\
//         text-decoration: none;\
//         &:hover {\
//           color: #878686;\
//         }\
//         svg {\
//           margin-right: 10px;\
//           width: 20px;\
//           height: 20px;\
//         }
//       }
//     }
//   }
// `;


{/* <SocialIcon>
            <ul>
              <li><a href="#"><FontAwesomeIcon icon={faFacebook} /> Facebook</a></li>
              <li><a href="#"><FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
              <li><a href="#"><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</a></li>
              <li><a href="#"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
            </ul>
          </SocialIcon> */}
