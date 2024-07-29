/**
 * this tab is for the hint by AI button.
 * It will prompt the AI to generate a hint for the problem
 */

import React from "react";
import HintByAIButton from "./HintByAIButton";

const HintByAi = ({problem}) => {
    return (
        <div>
            <h1>Hint By AI</h1>
            <p>Hint by AI will be added soon</p>
            <HintByAIButton
                title={problem.title}
                question={problem.description}
                answer={"testing"}
            />
        </div>
    );
};

export default HintByAi;
