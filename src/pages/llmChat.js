import React, {useState} from "react";
import {chatResponse} from "../api";

const LlmChat = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            const res = await chatResponse(message);
            setResponse(res); // Save response to state
            setError(null); // Clear previous error
        } catch (err) {
            setResponse(null); // Clear previous response
            setError(err.message); // Save error message to state
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                padding: "20px",
            }}
        >
            <h1>Welcome to CodeCoach</h1>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                id="question"
                style={{
                    width: "300px",
                    height: "150px",
                    margin: "10px 0",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                }}
            />
            <button
                onClick={handleSubmit}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#61dafb",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Send
            </button>
            {/* Display the response */}
            {response && (
                <div
                    style={{
                        backgroundColor: "#333",
                        padding: "15px",
                        borderRadius: "5px",
                        width: "80%",
                        marginTop: "20px",
                        color: "white",
                    }}
                >
                    <h2>Response:</h2>
                    <pre
                        style={{
                            width: "90%",
                            margin: "20px",
                            color: "white",
                            whiteSpace: "pre-wrap", // Preserve formatting and allow text wrapping
                            wordWrap: "break-word", // Ensure long words are wrapped
                        }}
                    >
                        {response}
                    </pre>
                </div>
            )}
            {/* Display error if there's any */}
            {error && (
                <div
                    style={{
                        backgroundColor: "#333",
                        padding: "15px",
                        borderRadius: "5px",
                        width: "80%",
                        marginTop: "20px",
                        color: "white",
                        whiteSpace: "pre-wrap", // Preserve formatting
                        wordWrap: "break-word", // Ensure long words are wrapped
                    }}
                >
                    <h2>Error:</h2>
                    <pre>{error}</pre>
                </div>
            )}
        </div>
    );
};

export default LlmChat;
