/**
 * Defines structure and functionality of navbar
 * using the components made in NavbarElements.js
 */

import React from "react"
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements"

// const Navbar = () => {
//   return (
//     <>
//       <Nav>
//         <Bars />

//         <NavMenu>
//           <NavLink to="/about">About</NavLink>
//           <NavLink to="/problems" activeStyle>
//             Problems
//           </NavLink>
//           <NavLink to="/sign-up" activeStyle>
//             Sign Up
//           </NavLink>
//           <NavLink to="/llm-chat" activeStyle>
//             LLM Chat
//           </NavLink>
//           {/* Second Nav */}
//           {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
//         </NavMenu>
//         <NavBtn>
//           <NavBtnLink to="/signin">Sign In</NavBtnLink>
//         </NavBtn>
//       </Nav>
//     </>
//   )
// }

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/problems" activeStyle>
            Problems
          </NavLink>
          <NavLink to="/sign-up" activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  )
}

export default Navbar
