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
import {getHint} from "../../api";
import { Button } from "@mui/material";

/**
 * Prompts the ai to generate a hint for the problem
 * once the user clicks the button. The ai will user
 * infrances given the problem itself and the hints stored
 * in the database for taht problem.
 * @param {title} string - problem title
 * @param {question} string - problem description
 * @param {answer} string - problem answer
 * @returns
 */
const HintByAIButton = ({title, question, answer, updateHintText}) => {
    const [isLoading, setIsLoading] = useState(false);

    // call the getHint function (defined in `api.js`)
    const handleGetHint = async () => {
        setIsLoading(true);
        try {
            const hintText = await getHint(title, question, answer);
            updateHintText(hintText);
        } catch (error) {
            console.error("Error fetching hint:", error);
            updateHintText("Error fetching hint. Please try again.");
        }
        setIsLoading(false);
    };
    // trigger it when user clicks the button and show results
    return (
        <div>
            <Button variant="contained" type="button" onClick={handleGetHint} disabled={isLoading}>
                {isLoading ? "Loading..." : "Get Hint"}
            </Button>
        </div>
    );
};

export default HintByAIButton;
