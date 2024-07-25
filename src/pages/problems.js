// pages/events.js

import React from "react"

// const Events = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "centre",
//         alignItems: "centre",
//         height: "100vh",
//       }}
//     >
//       <h1>Problems</h1>
//     </div>
//   )
// }

// export default Events
// Define your problems data
const problems = [
  {
    title: "Problem Title 1",
    description: "Description: This is the detailed description of the first problem.",
    difficulty: "Easy"
  },
  {
    title: "Problem Title 2",
    description: "Description: This is the detailed description of the second problem.",
    difficulty: "Medium"
  },
  {
    title: "Problem Title 3",
    description: "Description: This is the detailed description of the third problem.",
    difficulty: "Hard"
  }
];

const App = () => {
  return (
    <div>
      <header className="header_section">
        <div className="container">
          <nav className="navbar navbar-dark bg-dark">
            <a className="logo" href="home.html">
              <img src="images/CodeCoachLogo.png" alt="Logo" />
            </a>
            <div className="search_section">
              <ul>
                <li><a href="#">Log In</a></li>
                <li><a href="#"><img src="images/search-icon.png" alt="Search" /></a></li>
              </ul>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample01"
              aria-controls="navbarsExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsExample01">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active"><a className="nav-link" href="Home.html">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="LLMask.html">Question Prompt</a></li>
                <li className="nav-item"><a className="nav-link" href="Modules.html">Modules</a></li>
                <li className="nav-item"><a className="nav-link" href="Forum.html">Forum</a></li>
                <li className="nav-item"><a className="nav-link" href="AboutUs.html">About Us</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <main className="newsletter_section layout_padding">
        <div className="container">
          <div id="leftcolumn">
            <div className="dropdown">
              <label htmlFor="language">Choose language:</label>
              <select id="language">
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>
            <div className="dropdown">
              <label htmlFor="difficulty">Choose difficulty:</label>
              <select id="difficulty">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div id="rightcolumn">
            {problems.map((problem, index) => (
              <div key={index} className="problem">
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
                <p>Difficulty: {problem.difficulty}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <h4 className="information_text">Category</h4>
              <p className="dummy_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              </p>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="information_main">
                <h4 className="information_text">Useful Links</h4>
                <p className="many_text">
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="information_main">
                <h4 className="information_text">Contact Us</h4>
                <p className="call_text"><a href="#">+01 1234567890</a></p>
                <p className="call_text"><a href="#">+01 9876543210</a></p>
                <p className="call_text"><a href="#">demo@gmail.com</a></p>
                <div className="social_icon">
                  <ul>
                    <li><a href="#"><img src="images/fb-icon.png" alt="Facebook" /></a></li>
                    <li><a href="#"><img src="images/twitter-icon.png" alt="Twitter" /></a></li>
                    <li><a href="#"><img src="images/linkedin-icon.png" alt="LinkedIn" /></a></li>
                    <li><a href="#"><img src="images/instagram-icon.png" alt="Instagram" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
