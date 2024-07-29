/**
 * This tab will be used to display the problem to the user.
 */

import React from "react";

const ProblemTab = ({problem}) => {
    return (
        <div>
            <h1>{problem.title}</h1>
            <h2>Description</h2>
            <p>{problem.description}</p>
            <h2>Example Inputs</h2>
            <pre>{JSON.stringify(problem.exampleInputs, null, 2)}</pre>
            <h2>Example Outputs</h2>
            <pre>{JSON.stringify(problem.exampleOutputs, null, 2)}</pre>
            <h2>Test Cases</h2>
            <pre>{JSON.stringify(problem.testCases, null, 2)}</pre>
        </div>
    );
};
