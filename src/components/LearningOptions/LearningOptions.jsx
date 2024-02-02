import React from "react";

import "./LearningOptions.css";

const LearningOptions = (props) => {
  // Define an array of options, each with a text label and a corresponding handler function.
  const options = [
    {
      text: "Specific Page", // Text label for the option
      handler: props.actionProvider.handleJavascriptList, // Handler function for this option
      id: 1, // Unique identifier for this option
    },
    { 
      text: "What are we", 
      handler: () => props.actionProvider.handleWhatAreWe(),
      id: 2 
    },
    { 
      text: "Become a Volunteer", 
      handler: () => props.actionProvider.handleVolunteerNow(),
      id: 3 
    },
    { 
      text: "Join Us", 
      handler: () => props.actionProvider.handleInviteCode(), 
      id: 4 
    },
  ];

  // Map over the options array to generate buttons for each option.
  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler} // Attach the corresponding handler function to the button's click event
    >
      {option.text} {/* Display the text label of the option on the button */}
    </button>
  ));

  // Render the generated buttons within a container.
  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;
