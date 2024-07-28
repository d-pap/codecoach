/**
 * Home page
 * Put Home Page code here.
 * This is what shows when we go to localhost:3000 (or codecoach.com)
 */

import React from "react";

const Home = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "centre",
                alignItems: "centre",
                height: "100vh",
            }}
        >
            <h1>
                Welcome to CodeCoach. PUT HOMEPAGE CODE HERE - IN
                src/pages/index.js
            </h1>
        </div>
    );
};

export default Home;
