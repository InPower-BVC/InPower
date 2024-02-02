import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import LearningOptions from "../components/LearningOptions/LearningOptions";
import LinkList from "../components/LinkList/LinkList";

const config = {
  botName: "LearningBot",
  initialMessages: [
    createChatBotMessage("Hi, I'm here to help.I can help to find pages/tell you more about us/sign you up to be a volunteer", {
      widget: "learningOptions",
    }),
    // Add the following message
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#FFFFFF",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  widgets: 
  [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
    },
    {
      widgetName: "pageLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Career",
            url:
              "/discussion/a",
            id: 1,
          },
          {
            text: "Wellbeing",
            url:
              "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            id: 2,
          },
          // {
          //   text: "Frontend Masters",
          //   url: "https://frontendmasters.com",
          //   id: 3,
          // },
        ],
      },
    },

  ],
};

export default config;
