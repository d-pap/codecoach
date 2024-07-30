/**
 * this tab is for the hint by AI button.
 * It will prompt the AI to generate a hint for the problem
 */

import React, {useState} from "react";
import HintByAIButton from "../HintByAIButton";
import styled from "styled-components";
import NavbarStack from "./NavbarStack";

const HintDisplay = styled.div`
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    white-space: pre-line;
`;

const HintByAiTab = ({problem}) => {

    const storedLocation = "hintText" + problem._id;

    const [hintText, setHintText] = useState(() => {
        return localStorage.getItem(storedLocation) || "AI hint will appear here";
    });

    const updateHintText = (newHint) => {
        localStorage.setItem(storedLocation, newHint);
        setHintText(newHint);
    };

    return (
        <NavbarStack>
            <h1>Hint By AI</h1>
            <HintByAIButton
                title={problem.title}
                question={problem.description}
                answer={"testing"}
                updateHintText={updateHintText}  // Pass the update function as a prop
            />
            <HintDisplay>{hintText}</HintDisplay>
        </NavbarStack>
    );
};

export default HintByAiTab;