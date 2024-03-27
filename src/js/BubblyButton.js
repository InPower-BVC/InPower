import React from 'react'
import ReactBubblyEffectButton from "react-bubbly-effect-button";


// Define the click event handler
const onClick = () => {
}

// Create a BubblyButton component
const BubblyButton = () => {
  return (
    <ReactBubblyEffectButton
      text="Sign Up for our Beta!"      
      color='#fff'         
      bgColor='#7C0C24'    
      onClick={onClick}     // Event handler when the button is clicked
    />
  );
}

export default BubblyButton;
