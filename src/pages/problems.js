// pages/events.js

import React from "react"
// import './css/style.css';  
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

      
    </div>
  );
};

export default App;
