import React from "react";
import ChatBox from "../llm-components/ChatBox";
import "./ChatAITab.css"; // Import the CSS file

const ChatAITab = ({ problem }) => {
    return (
        <div className="chat-container">
            <ChatBox problem={problem} />
        </div>
    );
};

export default ChatAITab;
