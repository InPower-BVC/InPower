import React, { useState } from 'react';
import '../css/chatbot.css'; // Import CSS for the chatbot
import chatBotImage from '../img/chatbot.png'; // Import the chatbot icon image
import '../css/chatbotLogic.css';

// Import the chatbot logic
import ActionProvider from "../js/ActionProvider";
import MessageParser from "../js/MessageParser.js";
import config from "../js/config.js";

// Inbuilt react import for chatbot
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'; // Import CSS for the chatbot component

function ChatBotIcon() {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  // Function to toggle the chatbot's visibility
  const toggleChatBot = () => {
    setIsChatBotOpen(!isChatBotOpen);
  };

  return (
    <div>
      {/* Chatbot icon that toggles the chatbot */}
      <div className="chat-bot-icon" onClick={toggleChatBot}>
        <img src={chatBotImage} alt="Chat Bot" />
      </div>

      {/* Render the chatbot component when isChatBotOpen is true */}
      {isChatBotOpen && (
        <Chatbot
          config={config}                // Chatbot configuration
          actionProvider={ActionProvider} // Logic for chatbot actions
          messageParser={MessageParser}   // Logic for parsing messages
        />
      )}
    </div>
  );
}

export default ChatBotIcon;
