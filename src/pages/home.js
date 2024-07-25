import React from 'react';
// import './css/bootstrap.min.css'; // Adjust the path as needed
// import './css/style.css';         // Adjust the path as needed
// import './css/responsive.css';    // Adjust the path as needed
// import './css/jquery.mCustomScrollbar.min.css'; // Adjust the path as needed
// import './css/owl.carousel.min.css'; // Adjust the path as needed
// import './css/owl.theme.default.min.css'; // Adjust the path as needed

// import 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/owl.carousel.min.css';
// import 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css';
// import 'https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css';
// import 'https://code.jquery.com/jquery-3.2.1.slim.min.js';

const App = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="header_section">
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

        {/* Banner Section */}
        <div className="banner_section layout_padding">
          <div id="my_slider" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="taital_main">
                        <h4 className="banner_taital">
                          Advancing Computing as a Science & Profession with
                          <span className="font_size_50"> Ask AI</span>
                        </h4>
                        <p className="banner_text">
                          We see a world where computing helps solve tomorrow’s
                          problems – where we use our knowledge and skills to
                          advance the profession and make a positive impact.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <img src="images/codingman.png" className="image_1" alt="Coding Man" />
                      </div>
                    </div>
                  </div>
                  <div className="button_main">
                    <button className="all_text">Ask AI</button>
                    <input
                      type="text"
                      className="Enter_text"
                      placeholder="Enter keywords"
                      name=""
                    />
                    <button className="search_text">Search</button>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="taital_main">
                        <h4 className="banner_taital">
                          Practice for International Collegiate Programming
                          Contest
                        </h4>
                        <p className="banner_text">
                          Work to solve real-world problems, fostering
                          collaboration, creativity, innovation
                        </p>
                        <div className="book_bt"><a href="#">Practice Now</a></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <img src="images/ICPC-Banner.png" className="image_1" alt="ICPC Banner" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#my_slider"
              role="button"
              data-slide="prev"
            >
              <i><img src="images/left-icon.png" alt="Left Icon" /></i>
            </a>
            <a
              className="carousel-control-next"
              href="#my_slider"
              role="button"
              data-slide="next"
            >
              <i><img src="images/right-icon.png" alt="Right Icon" /></i>
            </a>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="container">
        <div className="category_section">
          <div className="row">
            <div className="col-lg-2 col-sm-12">
              <h1 className="category_text">Category</h1>
            </div>
            <div className="col-lg-10 col-sm-12 main">
              <div className="col">
                <div className="box_main">
                  <div className="icon_1"></div>
                  <h4 className="fashion_text active">practice in C++</h4>
                </div>
              </div>
              <div className="col">
                <div className="box_main">
                  <div className="icon_2"></div>
                  <h4 className="fashion_text">Python</h4>
                </div>
              </div>
              <div className="col">
                <div className="box_main">
                  <div className="icon_3"></div>
                  <h4 className="fashion_text">other</h4>
                </div>
              </div>
              <div className="col">
                <div className="box_main">
                  <div className="icon_4"></div>
                  <h4 className="fashion_text">other</h4>
                </div>
              </div>
              <div className="col">
                <div className="box_main">
                  <div className="icon_5"></div>
                  <h4 className="fashion_text">other</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <h4 className="information_text">Category</h4>
              <p className="dummy_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim
              </p>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="information_main">
                <h4 className="information_text">Useful Links</h4>
                <p className="many_text">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It
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
      </div>

      {/* JavaScript Files */}
      <script src="js/jquery.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.bundle.min.js"></script>
      <script src="js/jquery-3.0.0.min.js"></script>
      <script src="js/plugin.js"></script>
      <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
      <script src="js/custom.js"></script>
      <script src="js/owl.carousel.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/owl.carousel.min.js"></script>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    </div>
  );
};

export default App;
