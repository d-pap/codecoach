/**
 * Hint button for problem solving page that will call the LLM
 * (temporary placement and styling for now and can update it later)
 *
 * Makes a post request to APIGW endpoint (not yet made) that will
 * trigger a AWS Lambda function (not yet made) to send the problem
 * and a pre-defined prompt to Mistral LLM and then return the response
 * to the user to help them solve the problem.
 */

import React, {useState} from "react";
import styled from "styled-components";
import {getSolution} from "../../api";

const Button = styled.button`
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
`;

const SolveDisplay = styled.div`
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    white-space: pre-line;
`;

/**
 * Prompts the ai to generate a solution for the problem
 * once the user clicks the button. The ai will user
 * infrances given the problem itself and the hints stored
 * in the database for taht problem.
 * @param {title} string - problem title
 * @param {question} string - problem description
 * @param {answer} string - problem answer
 * @returns
 */
const SolveButton = ({title, question, answer}) => {
    const [solution, setSolution] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // call the getHint function (defined in `api.js`)
    const handleGetSolution = async () => {
        setIsLoading(true);
        try {
            const hintText = await getSolution(title, question, answer);
            setSolution(hintText);
        } catch (error) {
            console.error("Error fetching solution:", error);
            setSolution("Error fetching solution. Please try again.");
        }
        setIsLoading(false);
    };

    // trigger it when user clicks the button and show results
    return (
        <div>
            <Button onClick={handleGetSolution} disabled={isLoading}>
                {isLoading ? "Loading..." : "Get solution"}
            </Button>
            {solution && <SolveDisplay>{solution}</SolveDisplay>}
        </div>
    );
};

export default SolveButton;
