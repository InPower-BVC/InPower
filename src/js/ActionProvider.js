class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // Greet the user
  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend. How can I help you today?");
    this.updateChatbotState(greetingMessage);
  }

  // Handle user's positive response
  handleYesResponse() {
    const message = this.createChatBotMessage(
      "Great! Please let me know what else you need assistance with."
    );

    // Display follow-up messages
    setTimeout(() => {
      const followUpMessage = this.createChatBotMessage("I can help with finding pages on the website");
      this.updateChatbotState(followUpMessage);
    }, 2000); 

    setTimeout(() => {
      const followUpMessage = this.createChatBotMessage("Or tell you more About Us");
      this.updateChatbotState(followUpMessage);
    }, 4000); 

    setTimeout(() => {
      const followUpMessage = this.createChatBotMessage("If you like us, you can become a Volunteer too");
      this.updateChatbotState(followUpMessage);
    }, 6000); 

    this.updateChatbotState(message);
  }

  // Handle user's negative response
  handleNoResponse() {
    const message = this.createChatBotMessage(
      "Okay! If you have more questions in the future, feel free to ask. Have a great day!"
    );

    this.updateChatbotState(message);
  }

  // Handle default error response
  displayDefaultResponse() {
    const defaultResponse = this.createChatBotMessage(
      "Sorry, I didn't understand that. Maybe you can select something from the options below",
      {
        widget: "learningOptions",
      }
    );

    this.updateChatbotState(defaultResponse);

    // Display a follow-up question
    setTimeout(() => {
      const followUpMessage = this.createChatBotMessage("Did you find what you were looking for?");
      this.updateChatbotState(followUpMessage);
    }, 3000); 
  }

  // Display learning options to the user
  displayLearningOptions() {
    const learningOptionsMessage = this.createChatBotMessage(
      "Sure, here is what I can help you with",
      {
        widget: "learningOptions",
      }
    );

    this.updateChatbotState(learningOptionsMessage);
  }

  // Handle when user selects the JavaScript list option
  handleJavascriptList = () => {
    const message = this.createChatBotMessage(
      "Fantastic! These are the list of pages we have on our website. Do you need further assistance?",
      {
        widget: "pageLinks",
      }
    );

    this.updateChatbotState(message);

    // Display a follow-up question
    setTimeout(() => {
      const followUpMessage = this.createChatBotMessage("Is there anything else you need help with?");
      this.updateChatbotState(followUpMessage);
    }, 2000); 
  };

  // Handle when user asks "What are we?"
  handleWhatAreWe = () => {
    const message = this.createChatBotMessage(
      <div>
        We are a community  that provides a safe and inclusive space exclusively designed for women and non-binary individuals to come together, support each other, and thrive.
        <br />
        If you'd like to know more, you can visit our <button><a href="/Aboutus">About Us</a></button> page.
      </div>
    );
    this.updateChatbotState(message);

    // Display a follow-up message
    setTimeout(() => {
      const followUpMessage = this.createChatBotMessage(
        <div>
          If you like what we do, you can become a volunteer with us.
          <br />
          Visit our <button><a href="/volunteer">Volunteer</a></button> page to get started.
        </div>
      );
      this.updateChatbotState(followUpMessage);
    }, 2000);
  };

  // Handle when user asks to volunteer
  handleVolunteerNow = () => {
    const message = this.createChatBotMessage(
      <div>
        We're thrilled that you're interested in becoming part of our community as a volunteer!
        <br />
        Joining us as a volunteer is a fantastic way to make a positive impact, learn new skills, and connect with like-minded individuals.
        <br />
        To embark on this exciting journey, please visit our <button><a href="/volunteer">Volunteer</a></button> page. We can't wait to welcome you aboard!
      </div>
    );
    this.updateChatbotState(message);
  };

  // Handle when user asks about an invite code
  handleInviteCode = () => {
    const message = this.createChatBotMessage(
      <div>
        Welcome to our community! We're excited to have you on board.
        <br />
        To join our app and unlock a world of opportunities, you'll need an invite code. It's quick and easy to get started:
        <br />
        1. Simply provide your details, and we'll send you a unique invite code.
        <br />
        2. Download our mobile app.
        <br />
        3. Enter your invite code, and voilà, you're in!
        <br />
        Join us now by visiting our <button><a href="/invite">Join Us</a></button> page. We can't wait to see you inside!
      </div>
    );
    this.updateChatbotState(message);
  };
  
  // Update the chatbot state
  updateChatbotState(message) {
    // This function manipulates the top-level state of the Chatbot
    // Make sure to preserve the previous state
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
