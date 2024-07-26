// import React, { useEffect, useState } from "react"
// import { fetchProblems } from "../api"


// const Problems = () => {
//   const [problems, setProblems] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const getProblems = async () => {
//       try {
//         setIsLoading(true)
//         const problemsData = await fetchProblems()
//         setProblems(problemsData)
//       } catch (error) {
//         console.error("Failed to fetch problems:", error)
//         setError("Failed to fetch problems. Please try again later.")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     getProblems()
//   }, [])

//   if (isLoading) return <p>Loading problems...</p>
//   if (error) return <p>{error}</p>

//   return (
//     <div>
//       <h1>Problems</h1>
//       {problems.length > 0 ? (
//         <ul>
//           {problems.map((problem) => (
//             <li key={problem._id}>
//               <h2>{problem.title}</h2>
//               <p>{problem.description}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No problems found</p>
//       )}
//     </div>
//   )
// }

// export default Problems

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchProblems } from "../api"

function Problems() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getProblems() {
      try {
        const data = await fetchProblems()
        setProblems(data)
        setLoading(false)
      } catch (err) {
        setError("Error fetching problems")
        setLoading(false)
      }
    }
    getProblems()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (

    <div className="newsletter_section layout_padding">
      <div className="header"><h1>Problems</h1>
        <h3>Select a problem to get started</h3></div>
      <div className="container">
        <div id="leftcolumn">
          <div className="dropdown">
            <label htmlFor="language">Choose language: </label>
            <select id="language">
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>
          <div className="dropdown">
            <label htmlFor="difficulty">Choose difficulty: </label>
            <select id="difficulty">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div id="rightcolumn">

          <ul>
            {problems.map((problem) => (
              <li key={problem._id}>
                <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
                <p>{problem.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


export default Problems;

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

