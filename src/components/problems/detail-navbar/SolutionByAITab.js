/**
 * This tab is for the solution by AI button.
 * It will prompt the AI to generate a solution for the problem
 */

import React from "react";
import SolveByAIButton from "../SolveByAIButton";

const SolutionByAITab = ({problem}) => {
    return (
        <div>
            <h1>Solution By AI</h1>
            <SolveByAIButton
                title={problem.title}
                question={problem.description}
                answer={"testing"}
            />
        </div>
    );
};

export default SolutionByAITab;